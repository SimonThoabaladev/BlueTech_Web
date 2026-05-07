import { Link, useParams } from 'react-router-dom'

const posts = [
  {
    id: '1',
    title: 'Building a modern startup blog with React',
    content:
      'This article shows how to structure your landing page, blog posts, and service pages using React Router and Tailwind. It is built to help small brands launch fast.',
    category: 'Design',
    date: 'May 5, 2026',
  },
  {
    id: '2',
    title: 'Why a service-led brand wins online',
    content:
      'Services become more valuable when they are presented with clear benefits, strong visuals, and a consult page that makes it easy to connect.',
    category: 'Strategy',
    date: 'May 2, 2026',
  },
  {
    id: '3',
    title: 'How to turn visitors into clients',
    content:
      'Great content and a fast account flow help visitors trust you and move from reading into a real business relationship.',
    category: 'Marketing',
    date: 'April 27, 2026',
  },
]

export default function PostDetail() {
  const { id } = useParams()
  const post = posts.find((entry) => entry.id === id) || posts[0]

  return (
    <div className="space-y-8">
      <section className="card-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="hero-pill">{post.category}</span>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{post.title}</h1>
            <p className="mt-3 text-slate-400">Published {post.date}</p>
          </div>
          <Link
            to="/"
            className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-white"
          >
            Back to news
          </Link>
        </div>
      </section>

      <section className="card-glow">
        <p className="max-w-3xl leading-8 text-slate-300">{post.content}</p>
      </section>
    </div>
  )
}
