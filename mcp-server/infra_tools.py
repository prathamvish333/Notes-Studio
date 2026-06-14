import subprocess
import json

def register_infra_tools(mcp):
    """Registers Infrastructure tools (Docker, Git) with the FastMCP server."""

    @mcp.tool()
    def docker_list_images() -> str:
        """List the Docker images currently present on the VM."""
        try:
            # We use docker CLI with JSON formatting to make parsing easier
            cmd = ["docker", "image", "ls", "--format", "{{json .}}"]
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            
            # The output is a series of JSON objects separated by newlines
            images = [json.loads(line) for line in result.stdout.strip().split("\n") if line]
            
            # Filter and format the data to keep it concise for the AI
            formatted = []
            for img in images:
                formatted.append({
                    "repository": img.get("Repository"),
                    "tag": img.get("Tag"),
                    "size": img.get("Size"),
                    "created": img.get("CreatedAt")
                })
            return json.dumps(formatted, indent=2)
        except Exception as e:
            return f"Error running Docker: {str(e)}"
            
    @mcp.tool()
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
