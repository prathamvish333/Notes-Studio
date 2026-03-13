import Link from 'next/link';

const skills = {
  'Languages': ['Python', 'Shell Script', 'JavaScript', 'TypeScript'],
  'Backend': ['FastAPI', 'REST APIs', 'SQLAlchemy', 'JWT Auth'],
  'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Argo CD'],
  'Cloud & Infra': ['AWS', 'Linux', 'Microservices', 'CI/CD'],
  'Monitoring': ['Grafana', 'Prometheus'],
  'Databases': ['PostgreSQL', 'MySQL', 'SQLite'],
  'Tools': ['Git', 'GitHub', 'Azure Repos', 'VS Code'],
};

const projects = [
  {
    title: 'Pratham\'s OS — Interactive Portfolio',
    stack: 'Next.js • FastAPI • PostgreSQL • Docker • Kubernetes',
    description: 'A full-stack, OS-themed portfolio with a window manager, taskbar, file explorer, and terminal. Features JWT authentication, real-time note management, and a 3-tier containerized architecture deployed on Kubernetes.',
    liveUrl: '/desktop',
    githubUrl: 'https://github.com/prathamvish333/Notes-Studio',
    highlights: ['3-Tier Architecture', 'JWT Auth', 'Kubernetes Deployment', 'CI/CD Pipeline'],
  },
  {
    title: 'DevOps Infrastructure',
    stack: 'Jenkins • Docker • Kubernetes • Terraform • Grafana',
    description: 'Production-grade CI/CD pipeline with automated builds, container orchestration, infrastructure-as-code, and real-time monitoring dashboards. Full observability stack with Prometheus and Grafana.',
    githubUrl: 'https://github.com/prathamvish333',
    highlights: ['Jenkins Pipeline', 'Helm Charts', 'Prometheus Metrics', 'Terraform IaC'],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-100">

      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-3xl">
          <p className="mb-4 font-mono text-sm tracking-[0.3em] text-emerald-400/80 uppercase">Backend &amp; DevOps Engineer</p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Pratham<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Vishwakarma</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400 leading-relaxed">
            SDE-1 at <span className="text-white font-medium">Jio Platforms</span> · Building automation systems, backend services, and cloud infrastructure with Python, Docker, and Kubernetes.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/desktop" className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <span>⚡</span> Launch Interactive OS
            </Link>
            <a href="/Prathams_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-7 py-3 font-mono text-sm text-gray-300 transition-all hover:border-emerald-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              📄 Download Resume
            </a>
            <a href="https://github.com/prathamvish333" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-6 py-3 font-mono text-sm text-gray-300 transition-all hover:border-gray-500 hover:text-white">
              🐙 GitHub
            </a>
            <a href="https://www.linkedin.com/in/prathamvishwakarma" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-6 py-3 font-mono text-sm text-gray-300 transition-all hover:border-blue-500/50 hover:text-white">
              💼 LinkedIn
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-gray-600 p-1">
            <div className="h-2 w-1.5 mx-auto rounded-full bg-emerald-400/60" />
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="mb-8 font-mono text-xs tracking-[0.4em] text-emerald-400/60 uppercase">// About</h2>
        <div className="rounded-2xl border border-gray-800/80 bg-gray-900/40 p-8 sm:p-10 backdrop-blur-xl">
          <p className="text-lg leading-relaxed text-gray-300">
            Backend and DevOps Engineer with <span className="text-white font-medium">2+ years of experience</span> building automation systems and backend services. Currently working at <span className="text-emerald-400 font-medium">Jio Platforms</span> on the CloudXP platform, developing Python-based automation tools and workflow execution systems.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-400">
            I enjoy building reliable backend services, improving developer workflows, and automating infrastructure. My work spans from writing FastAPI microservices to deploying containerized applications on Kubernetes with full CI/CD pipelines.
          </p>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-12 font-mono text-xs tracking-[0.4em] text-emerald-400/60 uppercase">// Projects</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.title} className="group rounded-2xl border border-gray-800/80 bg-gray-900/30 p-8 transition-all hover:border-emerald-500/30 hover:bg-gray-900/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.06)]">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="font-mono text-xs text-emerald-400/70 mb-4">{project.stack}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.highlights.map((h) => (
                  <span key={h} className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                    {h}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.liveUrl && (
                  <Link href={project.liveUrl} className="rounded-lg bg-emerald-500/10 px-4 py-2 font-mono text-xs text-emerald-400 border border-emerald-500/20 transition-all hover:bg-emerald-500/20">
                    ▶ Live Demo
                  </Link>
                )}
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-gray-800/50 px-4 py-2 font-mono text-xs text-gray-400 border border-gray-700/50 transition-all hover:border-gray-600 hover:text-white">
                  🐙 Source Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-12 font-mono text-xs tracking-[0.4em] text-emerald-400/60 uppercase">// Skills</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="rounded-2xl border border-gray-800/80 bg-gray-900/30 p-6">
              <h3 className="mb-4 font-mono text-xs tracking-widest text-gray-500 uppercase">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="rounded-lg bg-gray-800/60 px-3 py-1.5 font-mono text-xs text-gray-300 border border-gray-700/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="mb-12 font-mono text-xs tracking-[0.4em] text-emerald-400/60 uppercase">// Experience</h2>
        <div className="rounded-2xl border border-gray-800/80 bg-gray-900/30 p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Software Development Engineer I</h3>
              <p className="text-emerald-400 font-medium">Jio Platforms Ltd</p>
            </div>
            <span className="font-mono text-xs text-gray-500 shrink-0">2024 — Present</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
            <li className="flex gap-3"><span className="text-emerald-500 mt-1 shrink-0">▸</span> Working on automation systems and backend components for the CloudXP platform using Python and containerized environments.</li>
            <li className="flex gap-3"><span className="text-emerald-500 mt-1 shrink-0">▸</span> Developing Python-based automation tools and workflow execution systems to streamline cloud operations.</li>
            <li className="flex gap-3"><span className="text-emerald-500 mt-1 shrink-0">▸</span> Building and maintaining CI/CD pipelines with Jenkins, Docker, and Kubernetes for reliable deployments.</li>
          </ul>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-800/50 py-12 text-center">
        <p className="font-mono text-xs text-gray-500">
          Built with Next.js, FastAPI, and Kubernetes · Deployed on GCP
        </p>
        <p className="mt-2 font-mono text-[10px] text-gray-600">
          © {new Date().getFullYear()} Pratham Vishwakarma · Pratham&apos;s OS v3.0
        </p>
      </footer>
    </main>
  );
}
