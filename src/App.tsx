import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Onboarding from '@/pages/Onboarding'
import OnboardingStep2 from '@/pages/OnboardingStep2'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import PasswordSuccess from './pages/PasswordSuccess'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/onboarding-step-2" element={<OnboardingStep2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App