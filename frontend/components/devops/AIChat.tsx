'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function AIChat() {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: 'DevOps AI Agent initialized. I have access to Kubernetes, Jenkins, ArgoCD, and Trivy tools.\n\nTry asking me:\n- "What is the status of the notes-dev pods?"\n- "Are there any vulnerabilities in my frontend image?"\n- "Did the last Jenkins build succeed?"' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            // Target the Next.js proxy route directly
            // Override Accept header so Nginx doesn't intercept it as a backend API request
            const res = await axios.post('/notes/mcp-chat', 
                { message: userMsg },
                { headers: { 'Accept': '*/*' } }
            );
            setMessages(prev => [...prev, { role: 'ai', content: res.data.reply }]);
        } catch (error: any) {
            setMessages(prev => [...prev, { role: 'ai', content: `[ERROR] Failed to connect to AI server: ${error.message}. Make sure the MCP server is running on port 8082.` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full w-full flex-col bg-[#0b1120]/80 p-6 font-mono text-xs border border-teal-500/20 rounded-2xl shadow-[0_0_20px_rgba(13,148,136,0.1)] backdrop-blur-md">
            <h2 className="text-teal-400 font-bold mb-4 flex items-center gap-3 text-lg uppercase tracking-widest border-b border-teal-500/20 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                DevOps Intelligence
            </h2>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar mb-4 space-y-5 pr-2">
                {messages.map((msg, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i} 
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <span className="text-[9px] text-gray-500 uppercase tracking-wider mb-1.5 font-bold">
                            {msg.role === 'user' ? 'pratham@admin' : 'ai_agent@cluster'}
                        </span>
                        <div className={`p-4 rounded-xl max-w-[90%] whitespace-pre-wrap leading-relaxed shadow-lg ${
                            msg.role === 'user' 
                                ? 'bg-teal-500/10 border border-teal-500/30 text-white rounded-tr-sm' 
                                : 'bg-[#111827] border border-white/5 text-gray-300 rounded-tl-sm'
                        }`}>
                            {msg.content}
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <div className="flex items-start">
                        <div className="p-4 rounded-xl bg-[#111827] border border-teal-500/30 text-teal-400 animate-pulse font-bold flex items-center gap-3 rounded-tl-sm shadow-lg">
                            <span className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></span>
                            Analyzing cluster & executing MCP tools...
                        </div>
                    </div>
                )}
            </div>
            
            <div className="relative flex items-center mt-2">
                <span className="absolute left-4 text-teal-500/70 shrink-0 font-bold text-sm">$</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me to check pods, scan images, or view Jenkins builds..."
                    disabled={loading}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-teal-500 focus:shadow-[0_0_20px_rgba(13,148,136,0.3)] transition-all disabled:opacity-50 text-sm"
                />
            </div>
        </div>
    );
}
