import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Onboarding from '@/pages/Onboarding'
import OnboardingStep2 from '@/pages/OnboardingStep2'
import Login from '@/pages/Login'
// import SignUp from '@/pages/SignUp'
// <Route path="/signup" element={<SignUp />} />

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/onboarding-step-2" element={<OnboardingStep2 />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App