export const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const port = window.location.port;

        // If it's an IP address, use the specific NodePort
        const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname);
        
        if (isIP) {
            return `http://${hostname}:30008`;
        }
        
        if (hostname === 'prathamvishwakarma.com' || hostname === 'www.prathamvishwakarma.com') {
            return `https://api.prathamvishwakarma.com`;
        }

        // When accessed via Ingress (port-forward or otherwise), route API through same origin
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            // If accessed on the default backend port, call backend directly
            if (port === '8000' || port === '3000') {
                return 'http://localhost:8000';
            }
            // Otherwise we're behind the Ingress — route through /api on same origin
            return `${window.location.protocol}//${hostname}:${port}/api`;
        }

        return `${window.location.protocol}//${hostname}/api`;
    }
    
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
};

export const getExternalUrl = (service: 'grafana' | 'prometheus' | 'jenkins' | 'swagger') => {
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname);

        if (isIP || hostname === 'localhost' || hostname === '127.0.0.1') {
            const ports = {
                grafana: isIP ? '30001' : '3001',
                prometheus: isIP ? '30090' : '9090',
                jenkins: isIP ? '30080' : '8080',
                swagger: isIP ? '30008/docs' : '8000/docs'
            };
            return `http://${hostname}:${ports[service]}`;
        }

        // Custom Domain Logic (Vercel/Cloudflare ready)
        if (hostname === 'prathamvishwakarma.com' || hostname === 'www.prathamvishwakarma.com') {
            // In production, we assume these are subdomains or proxied
            // For now, let's keep the VM IP fallback as requested but use the domain branding
            const backendSubdomain = "api.prathamvishwakarma.com";
            
            if (service === 'swagger') return `https://${backendSubdomain}/docs`;
            
            // For other tools, we might need dedicated subdomains or port mapping
            return `https://${service}.prathamvishwakarma.com`;
        }

        const backendVM = "34.67.4.191";
        const vmPorts = {
            grafana: '30001',
            prometheus: '30090',
            jenkins: '30080',
            swagger: '30008/docs'
        };

        // If you haven't set up subdomains yet, this will point to your VM IP ports
        return `http://${backendVM}:${vmPorts[service]}`;
    }

    return '#';
};
