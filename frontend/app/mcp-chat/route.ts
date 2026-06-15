import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Use the Kubernetes internal service name if running in K8s, 
        // fallback to localhost for local development
        const mcpUrl = process.env.NODE_ENV === 'production' 
            ? 'http://mcp-server.notes-dev.svc.cluster.local:8080/api/chat'
            : 'http://localhost:8082/api/chat';

        const response = await fetch(mcpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`MCP Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("MCP Proxy Error:", error.message);
        return NextResponse.json(
            { reply: `[ERROR] Proxy failed to connect to AI server: ${error.message}. Make sure the mcp-server pod is running.` },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ reply: "GET request received. Please use POST for AI Chat." });
}

export async function OPTIONS() {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
}
