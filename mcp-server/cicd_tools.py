import httpx
import json
import os

# We will read URLs and tokens from environment variables.
# In a real setup, these would come from a .env file or K8s Secrets.
JENKINS_URL = os.environ.get("JENKINS_URL", "http://localhost:8080")
JENKINS_USER = os.environ.get("JENKINS_USER", "admin")
JENKINS_TOKEN = os.environ.get("JENKINS_TOKEN", "")

ARGOCD_URL = os.environ.get("ARGOCD_URL", "http://localhost:8080") # Assuming ArgoCD port-forwarded or accessible
ARGOCD_TOKEN = os.environ.get("ARGOCD_TOKEN", "")

def register_cicd_tools(mcp):
    """Registers Jenkins and ArgoCD tools with the FastMCP server."""

    @mcp.tool()
    def jenkins_get_builds(job_name: str = "Notes-Studio-Dev", count: int = 5) -> str:
        """Get the latest CI/CD builds from Jenkins for a specific job."""
        try:
            url = f"{JENKINS_URL}/job/{job_name}/api/json?tree=builds[id,result,duration,timestamp]{{0,{count}}}"
            # Only use auth if token is provided
            auth = (JENKINS_USER, JENKINS_TOKEN) if JENKINS_TOKEN else None
            
            with httpx.Client() as client:
                resp = client.get(url, auth=auth, timeout=10.0)
                # If we get a 401/403, we return a helpful error
                if resp.status_code in [401, 403]:
                    return f"Authentication failed for Jenkins. Please check your JENKINS_TOKEN."
                resp.raise_for_status()
                
                data = resp.json()
                return json.dumps(data.get("builds", []), indent=2)
        except Exception as e:
            return f"Error connecting to Jenkins: {str(e)}"

    @mcp.tool()
    def argocd_get_apps() -> str:
        """Get the GitOps sync and health status of all ArgoCD applications."""
        try:
            url = f"{ARGOCD_URL}/api/v1/applications"
            headers = {"Authorization": f"Bearer {ARGOCD_TOKEN}"} if ARGOCD_TOKEN else {}
            
            # verify=False is often needed for ArgoCD's default self-signed certs
            with httpx.Client(verify=False) as client:
                resp = client.get(url, headers=headers, timeout=10.0)
                if resp.status_code in [401, 403]:
                    return f"Authentication failed for ArgoCD. Please check your ARGOCD_TOKEN."
                resp.raise_for_status()
                
                data = resp.json()
                items = data.get("items", [])
                result = []
                for app in items:
                    result.append({
                        "name": app.get("metadata", {}).get("name"),
                        "sync_status": app.get("status", {}).get("sync", {}).get("status", "Unknown"),
                        "health_status": app.get("status", {}).get("health", {}).get("status", "Unknown"),
                        "destination_namespace": app.get("spec", {}).get("destination", {}).get("namespace", "Unknown")
                    })
                return json.dumps(result, indent=2)
        except Exception as e:
            return f"Error connecting to ArgoCD: {str(e)}"
