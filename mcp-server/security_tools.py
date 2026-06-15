import subprocess
import json
import httpx
import os

# SonarQube Config
SONAR_URL = os.environ.get("SONAR_URL", "http://localhost:9000")
SONAR_TOKEN = os.environ.get("SONAR_TOKEN", "")

def trivy_scan_image(image_name: str) -> str:
    """Run a Trivy vulnerability scan on a given Docker image. Returns a summary of CVEs."""
    try:
        # Note: We assume Trivy is installed on the host/VM where the MCP server runs
        # We output in JSON format so we can parse and summarize it for the AI
        cmd = ["trivy", "image", "--format", "json", "--quiet", image_name]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        # Trivy might return non-zero exit code if vulns are found, but still output valid JSON
        if not result.stdout.strip():
            return f"Trivy scan failed or produced no output: {result.stderr}"
            
        data = json.loads(result.stdout)
        
        # We must summarize the data! Full Trivy JSON is too massive for an AI context window.
        summary = {
            "scanned_image": image_name,
            "vulnerability_counts": {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0, "UNKNOWN": 0},
            "top_critical_cves": [] # We only list the first few critical ones
        }
        
        for res in data.get("Results", []):
            for v in res.get("Vulnerabilities", []):
                severity = v.get("Severity", "UNKNOWN")
                if severity in summary["vulnerability_counts"]:
                    summary["vulnerability_counts"][severity] += 1
                
                if severity == "CRITICAL" and len(summary["top_critical_cves"]) < 5:
                    summary["top_critical_cves"].append({
                        "id": v.get("VulnerabilityID"),
                        "package": v.get("PkgName"),
                        "title": v.get("Title")
                    })
                    
        return json.dumps(summary, indent=2)
        
    except FileNotFoundError:
        return "Error: The 'trivy' command is not installed or not in PATH."
    except Exception as e:
        return f"Error parsing Trivy scan: {str(e)}"

def sonarqube_get_metrics(project_key: str = "Notes-Studio-Dev") -> str:
    """Get code quality metrics (bugs, vulnerabilities, code smells) from SonarQube."""
    try:
        url = f"{SONAR_URL}/api/measures/component"
        # We request the specific metrics we care about
        params = {
            "component": project_key,
            "metricKeys": "bugs,vulnerabilities,code_smells,coverage,alert_status"
        }
        auth = (SONAR_TOKEN, "") if SONAR_TOKEN else None
        
        with httpx.Client() as client:
            resp = client.get(url, params=params, auth=auth, timeout=10.0)
            
            if resp.status_code in [401, 403]:
                return "Authentication failed for SonarQube. Please check SONAR_TOKEN."
            elif resp.status_code == 404:
                return f"SonarQube project '{project_key}' not found."
                
            resp.raise_for_status()
            data = resp.json()
            
            # Format the response nicely
            measures = data.get("component", {}).get("measures", [])
            result = {}
            for m in measures:
                result[m["metric"]] = m["value"]
                
            return json.dumps(result, indent=2)
    except Exception as e:
        return f"Error connecting to SonarQube: {str(e)}"

def register_security_tools(mcp):
    """Registers Security and Code Quality tools with the FastMCP server."""
    mcp.tool()(trivy_scan_image)
    mcp.tool()(sonarqube_get_metrics)
