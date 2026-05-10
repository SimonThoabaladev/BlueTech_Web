import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthProvider'
import { useState } from 'react'

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      await auth.login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.')
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="card-glow text-center">
        <span className="hero-pill">Login</span>
        <h2 className="page-title">Access your account</h2>
        <p className="mx-auto max-w-xl text-slate-300">
          Sign in to manage posts, review consulting requests, and keep your services up to date.
        </p>
      </section>

      <form className="card-glow space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Log in
        </button>
        <p className="text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <Link className="text-cyan-200 hover:text-white" to="/signup">
            Create one
          </Link>
        </p>
      </form>
    </div>
  )
}
