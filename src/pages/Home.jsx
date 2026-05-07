import { Link } from 'react-router-dom'

const posts = [
  {
    id: '1',
    title: 'Building a modern startup blog with React',
    summary: 'A quick guide to structure a clean business site using React Router and Tailwind.',
    category: 'Design',
    date: 'May 5, 2026',
  },
  {
    id: '2',
    title: 'Why a service-led brand wins online',
    summary: 'Turn your expertise into trust by showcasing services, consulting, and blog content.',
    category: 'Strategy',
    date: 'May 2, 2026',
  },
  {
    id: '3',
    title: 'How to turn visitors into clients',
    summary: 'Practical ideas for lead capture, contact pages, and consulting funnels.',
    category: 'Marketing',
    date: 'April 27, 2026',
  },
]

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="card-glow overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-center">
          <div className="space-y-6">
            <span className="hero-pill">Business news & posts</span>
            <h2 className="page-title max-w-2xl">
              Fresh stories, helpful updates, and ideas for your creative business.
            </h2>
            <p className="max-w-xl text-slate-300 sm:text-lg">
              Launch your professional news feed with featured posts, a services showcase,
              and a consulting page tailored for clients who are ready to connect.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/services"
                className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Explore services
              </Link>
              <Link
                to="/consult"
                className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-100 transition hover:border-cyan-300 hover:text-white"
              >
                Book a consultation
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-8 shadow-glow">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/90">Latest article</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">How to package your services as a brand story</h3>
                <p className="mt-3 text-slate-300">
                  A starter path for showing what you sell, attracting clients, and creating repeat visitors.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-5">
                  <h4 className="text-base font-semibold text-white">Brand trust</h4>
                  <p className="mt-2 text-sm text-slate-400">Tell people who you serve and why your experience matters.</p>
                </div>
                <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-5">
                  <h4 className="text-base font-semibold text-white">Fast access</h4>
                  <p className="mt-2 text-sm text-slate-400">Give clients a clear place to consult and to book support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-heading">News page</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">Latest posts from the blog</h3>
          </div>
          <p className="max-w-xl text-slate-400">
            Share business updates, service announcements, and consulting tips so visitors return again and again.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="card-glow block transition hover:-translate-y-1 hover:border-cyan-300/60"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">{post.category}</span>
              <h4 className="mt-4 text-2xl font-semibold text-white">{post.title}</h4>
              <p className="mt-3 text-slate-400">{post.summary}</p>
              <p className="mt-5 text-sm text-slate-500">{post.date}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
