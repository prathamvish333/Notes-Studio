export interface FSNode {
    name: string;
    type: 'file' | 'dir';
    content?: string;
    children?: FSNode[];
    icon?: string;
}

export const VIRTUAL_FS: FSNode[] = [
    {
        name: 'home',
        type: 'dir',
        children: [
            {
                name: 'pratham',
                type: 'dir',
                children: [
                    {
                        name: 'documents',
                        type: 'dir',
                        children: [
                            { name: 'Prathams_Resume.pdf', type: 'file', icon: '📄' },
                            { name: 'project_notes.txt', type: 'file', content: 'Notes-Studio: A full-stack Next.js/FastAPI application with Kubernetes and DevOps monitoring.', icon: '📝' }
                        ]
                    },
                    {
                        name: 'applications',
                        type: 'dir',
                        children: [
                            { name: 'Notes_Studio', type: 'file', icon: '📁' },
                            { name: 'Hacker_Type', type: 'file', icon: '⌨️' },
                            { name: 'Terminal', type: 'file', icon: '💻' }
                        ]
                    },
                    {
                        name: 'monitoring',
                        type: 'dir',
                        children: [
                            { name: 'Grafana', type: 'file', icon: '📊' },
                            { name: 'Prometheus', type: 'file', icon: '🔥' },
                            { name: 'Jenkins', type: 'file', icon: '⚙️' }
                        ]
                    }
                ]
            }
        ]
    }
];

export const getPathNodes = (path: string): FSNode[] | null => {
    const parts = path.split('/').filter(Boolean);
    let current: FSNode[] = VIRTUAL_FS;
    
    for (const part of parts) {
        const found = current.find(node => node.name === part);
        if (found && found.type === 'dir' && found.children) {
            current = found.children;
        } else if (found && found.type === 'file') {
            return null; // Not a directory
        } else {
            return null; // Not found
        }
    }
    return current;
};
