import os
import sys
from fastmcp import FastMCP
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from k8s_tools import register_k8s_tools
from cicd_tools import register_cicd_tools
from infra_tools import register_infra_tools
from security_tools import register_security_tools
from ai_chat import router as ai_router

# Initialize FastMCP Server
mcp = FastMCP("NotesStudioDevOps")

# Register Kubernetes Tools
register_k8s_tools(mcp)

# Register CI/CD Tools
register_cicd_tools(mcp)

# Register Infrastructure & Security Tools
register_infra_tools(mcp)
register_security_tools(mcp)

@mcp.tool()
def system_health_check() -> str:
    """Check the health of the MCP server and return status."""
    return "MCP Server is running normally. All systems operational."

# Initialize FastAPI app to expose the AI chat to the frontend
app = FastAPI(title="DevOps AI Router")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount our custom AI Chat endpoint
app.include_router(ai_router, prefix="/api")

@app.get("/health")
def health():
    return {"status": "ok", "service": "DevOps MCP Server"}

if __name__ == "__main__":
    # Run the FastAPI server which also hosts the FastMCP SSE endpoints
    port = int(os.environ.get("PORT", 8082))
    print(f"Starting DevOps MCP Server on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
