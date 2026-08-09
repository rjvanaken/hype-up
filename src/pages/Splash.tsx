import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoSpinner from '@/assets/hype-up-logo-spinner.gif'

const SINGLE_LOOP_MS = 1960
const LOOP_COUNT = 2

function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, SINGLE_LOOP_MS * LOOP_COUNT)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <img src={logoSpinner} alt="" className="h-24 w-24 object-contain" />
    </div>
  )
}

export default Splash
