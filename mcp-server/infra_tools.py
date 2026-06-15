import subprocess
import json

def docker_list_containers() -> str:
    """List all running Docker containers on the host VM."""
    try:
        # We run the command natively (this assumes the container has docker CLI or talks to socket)
        # Assuming the pod has docker cli installed and docker.sock mounted.
        cmd = ["docker", "ps", "--format", "{{.ID}}|{{.Image}}|{{.Status}}|{{.Names}}"]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            return f"Error listing containers: {result.stderr}"
            
        containers = []
        for line in result.stdout.strip().split("\n"):
            if line:
                cid, image, status, name = line.split("|")
                containers.append({"id": cid, "image": image, "status": status, "name": name})
                
        return json.dumps(containers, indent=2)
    except FileNotFoundError:
        return "Error: Docker CLI is not installed in the MCP server container."
    except Exception as e:
        return f"Error running Docker: {str(e)}"
        
def git_recent_commits(branch: str = "dev", count: int = 5) -> str:
    """Get the recent git commits from a specific branch to track what changed."""
    try:
        # We assume the MCP server is running inside the git repository
        # format:%h (hash) %an (author name) %s (subject/message) %cr (relative date)
        cmd = ["git", "log", branch, f"-{count}", "--pretty=format:%h - %an: %s (%cr)"]
        
        # We must run this in the parent directory where the .git folder is
        parent_dir = ".."
        result = subprocess.run(cmd, cwd=parent_dir, capture_output=True, text=True, check=True)
        
        if not result.stdout.strip():
            return f"No commits found on branch '{branch}'."
            
        return result.stdout
    except subprocess.CalledProcessError as e:
        return f"Error running git (exit code {e.returncode}): {e.stderr}"
    except Exception as e:
        return f"Error running git: {str(e)}"

def register_infra_tools(mcp):
    """Registers Infrastructure and Git tools with the FastMCP server."""
    mcp.tool()(docker_list_containers)
    mcp.tool()(git_recent_commits)
