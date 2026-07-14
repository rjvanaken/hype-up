import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Onboarding from '@/pages/Onboarding'
import OnboardingStep2 from '@/pages/OnboardingStep2'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import ResetPasswordStep2 from '@/pages/ResetPasswordStep2'
import ResetPassword from '@/pages/ResetPassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/onboarding-step-2" element={<OnboardingStep2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password-step-2" element={<ResetPasswordStep2 />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App