import { Link } from 'react-router-dom'
import { useAuth } from '../AuthProvider'

export default function Dashboard() {
  const auth = useAuth()

  return (
    <div className="space-y-8">
      <section className="card-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="hero-pill">Dashboard</span>
            <h2 className="page-title">Welcome back, {auth.user?.name || 'User'}!</h2>
            <p className="text-slate-300">Manage your business, posts, and client interactions from here.</p>
          </div>
          <p className="text-sm text-slate-400">Last login: Today</p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/"
          className="card-glow block transition hover:-translate-y-1 hover:border-cyan-300/60"
        >
          <h3 className="text-xl font-semibold text-white">News & Posts</h3>
          <p className="mt-2 text-slate-400">View and manage your blog posts and updates.</p>
        </Link>
        <Link
          to="/services"
          className="card-glow block transition hover:-translate-y-1 hover:border-cyan-300/60"
        >
          <h3 className="text-xl font-semibold text-white">Services</h3>
          <p className="mt-2 text-slate-400">Showcase what you sell and attract new clients.</p>
        </Link>
        <Link
          to="/consult"
          className="card-glow block transition hover:-translate-y-1 hover:border-cyan-300/60"
        >
          <h3 className="text-xl font-semibold text-white">Consultations</h3>
          <p className="mt-2 text-slate-400">Book and manage client consultation requests.</p>
        </Link>
        <Link
          to="/contact"
          className="card-glow block transition hover:-translate-y-1 hover:border-cyan-300/60"
        >
          <h3 className="text-xl font-semibold text-white">Contact Messages</h3>
          <p className="mt-2 text-slate-400">Review and respond to incoming inquiries.</p>
        </Link>
        <div className="card-glow">
          <h3 className="text-xl font-semibold text-white">Analytics</h3>
          <p className="mt-2 text-slate-400">Track visitor engagement and business metrics.</p>
          <p className="mt-4 text-sm text-cyan-200">Coming soon</p>
        </div>
        <div className="card-glow">
          <h3 className="text-xl font-semibold text-white">Settings</h3>
          <p className="mt-2 text-slate-400">Update your profile and business information.</p>
          <p className="mt-4 text-sm text-cyan-200">Coming soon</p>
        </div>
      </section>
    </div>
  )
}
