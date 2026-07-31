import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Onboarding from '@/pages/Onboarding'
import OnboardingStep2 from '@/pages/OnboardingStep2'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import PasswordSuccess from './pages/PasswordSuccess'
import Home from './pages/Home'
import AppNav from './components/custom/AppNav'
import Profile from './pages/Profile'
import Todos from './pages/Todos'
import Reminders from './pages/Reminders'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding and Login - no navigation */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/onboarding-step-2" element={<OnboardingStep2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/" element={<Reminders />} />

        {/* Main app - navigation applied */}
        <Route element={<AppNav />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App