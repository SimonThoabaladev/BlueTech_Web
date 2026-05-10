import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Consult from './pages/Consult'
import Contact from './pages/Contact'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import PostDetail from './pages/PostDetail'
import Dashboard from './pages/Dashboard'
import { AuthProvider, useAuth } from './AuthProvider'

const navLinks = [
  { name: 'News', to: '/' },
  { name: 'What I Sell', to: '/services' },
  { name: 'Consult', to: '/consult' },
  { name: 'Contact', to: '/contact' },
]

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-400/20'
      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
  }`

function RequireAuth({ children }) {
  const auth = useAuth()
  return auth.user ? children : <Navigate to="/login" replace />
}


function LoginWithIntro() {
  return <Login />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <AppShell />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

function AppShell() {
  const auth = useAuth()

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">BlueTech Solutions</p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Creative Business Starter</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {auth.user ? (
              navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                  {link.name}
                </NavLink>
              ))
            ) : (
              <p className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
                Please log in to access the menu
              </p>
            )}
            {auth.user ? (
              <button
                onClick={() => auth.logout()}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-white"
              >
                Log out
              </button>
            ) : (
              <>
                <NavLink to="/login" className={linkClass}>
                  Log in
                </NavLink>
                <NavLink to="/signup" className={linkClass}>
                  Create account
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Routes>
          <Route path="/login" element={<LoginWithIntro />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/services"
            element={
              <RequireAuth>
                <Services />
              </RequireAuth>
            }
          />
          <Route
            path="/consult"
            element={
              <RequireAuth>
                <Consult />
              </RequireAuth>
            }
          />
          <Route
            path="/contact"
            element={
              <RequireAuth>
                <Contact />
              </RequireAuth>
            }
          />
          <Route
            path="/post/:id"
            element={
              <RequireAuth>
                <PostDetail />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to={auth.user ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">BlueTech Solutions</h3>
              <p className="text-slate-300 text-sm">
                Creative business solutions for modern enterprises. Empowering innovation through technology.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><NavLink to="/" className="hover:text-cyan-300 transition">News</NavLink></li>
                <li><NavLink to="/services" className="hover:text-cyan-300 transition">Services</NavLink></li>
                <li><NavLink to="/consult" className="hover:text-cyan-300 transition">Consult</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-cyan-300 transition">Contact</NavLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-white mb-4">Contact Info</h4>
              <div className="text-sm text-slate-300 space-y-2">
                <p>Email: info@bluetechblog.com</p>
                <p>Phone: (+266) 624 13 823</p>
                <p>Address: Qoaling, Maseru 100</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            <p>&copy; 2024 BlueTech Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
