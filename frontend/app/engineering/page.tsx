import Link from 'next/link';

const articles = [
  {
    title: 'Building a FastAPI Authentication System with JWT',
    date: '2025-02-15',
    tags: ['FastAPI', 'JWT', 'Python', 'Security'],
    summary: 'A deep dive into implementing secure token-based authentication using FastAPI, SQLAlchemy, and bcrypt. Covers password hashing, token generation, middleware guards, and role-based access control.',
    slug: '#',
  },
  {
    title: 'Deploying Containerized Applications on Kubernetes',
    date: '2025-01-20',
    tags: ['Kubernetes', 'Docker', 'DevOps', 'GCP'],
    summary: 'End-to-end walkthrough of deploying a 3-tier application (Next.js + FastAPI + PostgreSQL) on a Kubernetes cluster with Helm charts, persistent volumes, and Ingress controllers.',
    slug: '#',
  },
  {
    title: 'Building CI/CD Pipelines with Jenkins and Docker',
    date: '2024-12-10',
    tags: ['Jenkins', 'Docker', 'CI/CD', 'Automation'],
    summary: 'How I set up a fully automated build-test-deploy pipeline using Jenkins declarative pipelines, Docker multi-stage builds, and automated image tagging with version control hooks.',
    slug: '#',
  },
];

export default function EngineeringPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-100">
      <div className="mx-auto max-w-3xl px-6 py-24">

        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="font-mono text-xs text-gray-500 hover:text-emerald-400 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white tracking-tight">Engineering</h1>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Technical write-ups on backend architecture, DevOps practices, and infrastructure decisions.
          </p>
        </div>

        {/* Articles */}
        <div className="space-y-8">
          {articles.map((article) => (
            <article key={article.title} className="group rounded-2xl border border-gray-800/80 bg-gray-900/30 p-8 transition-all hover:border-emerald-500/30 hover:bg-gray-900/50">
              <div className="flex items-center gap-3 mb-3">
                <time className="font-mono text-xs text-gray-500">{article.date}</time>
                <div className="flex gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400/80 border border-emerald-500/15">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {article.summary}
              </p>
              <p className="mt-4 font-mono text-xs text-gray-600 italic">
                Full article coming soon...
              </p>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800/50 text-center">
          <p className="font-mono text-xs text-gray-600">
            More articles in progress. Follow on <a href="https://github.com/prathamvish333" className="text-emerald-400/60 hover:text-emerald-400">GitHub</a> for updates.
          </p>
        </div>
      </div>
    </main>
  );
}
