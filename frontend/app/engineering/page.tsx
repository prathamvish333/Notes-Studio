import Link from 'next/link';

const articles = [
  {
    title: 'Designing JWT Authentication with FastAPI',
    date: '2025-02-15',
    tags: ['FastAPI', 'JWT', 'Security', 'Python'],
    summary: 'A comprehensive guide to implementing stateless, secure authentication using JSON Web Tokens. Covers password hashing with bcrypt, token lifecycle management, and middleware integration for route protection.',
    slug: '#',
  },
  {
    title: 'Containerizing Python APIs with Docker',
    date: '2025-01-20',
    tags: ['Docker', 'DevOps', 'Python', 'Microservices'],
    summary: 'Best practices for creating efficient, production-ready Docker images for Python applications. Explores multi-stage builds, non-root user security, and managing dependencies with poetry or pip.',
    slug: '#',
  },
  {
    title: 'Deploying Backend Services with Kubernetes',
    date: '2024-12-10',
    tags: ['Kubernetes', 'K8s', 'Orchestration', 'Scaling'],
    summary: 'Scaling distributed backend services on Kubernetes. Walkthrough of defining deployment manifests, service discovery, persistent volumes, and health monitoring via Prometheus.',
    slug: '#',
  },
];

export default function EngineeringPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-100">
      <div className="mx-auto max-w-3xl px-6 py-24">

        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="font-mono text-xs text-gray-500 hover:text-blue-400 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white tracking-tight">Engineering</h1>
          <p className="mt-4 text-gray-400 leading-relaxed font-medium">
            Technical write-ups on backend architecture, DevOps practices, and infrastructure decisions.
          </p>
        </div>

        {/* Articles */}
        <div className="space-y-8">
          {articles.map((article) => (
            <article key={article.title} className="group rounded-2xl border border-white/5 bg-white/[0.01] p-8 transition-all hover:border-blue-500/30 hover:bg-white/[0.03]">
              <div className="flex items-center gap-3 mb-3">
                <time className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{article.date}</time>
                <div className="flex gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-blue-500/10 px-2.5 py-0.5 font-heading text-[10px] text-blue-400 font-bold border border-blue-500/15 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {article.summary}
              </p>
              <p className="mt-4 font-mono text-[10px] text-gray-600 italic uppercase tracking-widest">
                Full technical report pending migration...
              </p>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
            Detailed architecture logs available on <a href="https://github.com/prathamvish333" className="text-blue-500 hover:text-blue-400">GitHub</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
