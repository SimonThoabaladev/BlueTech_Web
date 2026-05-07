import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('bluetech-user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      login(email) {
        const next = { email, name: email.split('@')[0] }
        window.localStorage.setItem('bluetech-user', JSON.stringify(next))
        setUser(next)
      },
      signup(name, email) {
        const next = { name, email }
        window.localStorage.setItem('bluetech-user', JSON.stringify(next))
        setUser(next)
      },
      logout() {
        window.localStorage.removeItem('bluetech-user')
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
