from kubernetes import client, config
import json

# Initialize Kubernetes Client
# It tries to use local ~/.kube/config first (for local testing),
# and falls back to incluster config (for when it runs on your VM inside a pod).
try:
    config.load_kube_config()
except Exception:
    try:
        config.load_incluster_config()
    except Exception as e:
        print(f"Warning: Could not load Kubernetes config. K8s tools may fail. Error: {e}")

def register_k8s_tools(mcp):
    """Registers Kubernetes-related tools with the provided FastMCP server."""

    @mcp.tool()
    def k8s_get_pods(namespace: str = "notes-dev") -> str:
        """List all pods in a given Kubernetes namespace with their current status."""
        try:
            v1 = client.CoreV1Api()
            pods = v1.list_namespaced_pod(namespace)
            result = []
            for pod in pods.items:
                result.append({
                    "name": pod.metadata.name,
                    "status": pod.status.phase,
                    "ip": pod.status.pod_ip,
                    "restarts": sum(container.restart_count for container in (pod.status.container_statuses or [])),
                })
            return json.dumps(result, indent=2)
        except Exception as e:
            return f"Error fetching pods in namespace {namespace}: {str(e)}"

    @mcp.tool()
    def k8s_get_logs(pod_name: str, namespace: str = "notes-dev", lines: int = 50) -> str:
        """Fetch the last N lines of logs from a specific pod. Use this to debug application errors."""
        try:
            v1 = client.CoreV1Api()
            logs = v1.read_namespaced_pod_log(name=pod_name, namespace=namespace, tail_lines=lines)
            return logs
        except Exception as e:
            return f"Error fetching logs for pod {pod_name}: {str(e)}"
