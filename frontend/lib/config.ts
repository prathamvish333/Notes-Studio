export const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;

        // If it's an IP address or localhost, we use the specific port 30008
        // If it's a custom domain (like notes.com), it likely goes through an Ingress/Cloudflare on port 80/443
        const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname);
        
        if (isIP) {
            return `http://${hostname}:30008`;
        }
        
        if (hostname === 'prathamvishwakarma.com' || hostname === 'www.prathamvishwakarma.com') {
            // Point to the dedicated backend subdomain
            return `https://api.prathamvishwakarma.com`;
        }

        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
            return `${window.location.protocol}//${hostname}`;
        }
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
