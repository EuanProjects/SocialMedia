import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login')
    }
  }, [location, navigate])

  return (
    <>
      <Outlet />
    </>
  )
}

export default App