import CenteredCard from '@/components/custom/CenteredCard'
import CenteredPage from '@/components/custom/CenteredPage'
import FormField from '@/components/custom/FormField'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import logo from '@/assets/HypeUp_onb_login_logo.svg'
import text_logo_large from '@/assets/HypeUpLarge.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validateSignUpFields } from '@/lib/validation'

function SignUp() {
  const navigate = useNavigate()
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')


  async function handleSignUp() {
    // reset error
    setError('')

    const validationError = validateSignUpFields(first, last, email, password, confirm)
    if (validationError) {
      setError(validationError)
      return
  }

  // TODO: get the error here (see other examples) and use conditionals (add to below), set condotionals to each message scenario below
  
          if (error) {
            setError(error.message)
            setError (<AlertCircle /> + "Sign up failed. Please try again later.")
  }

  }

  return (
    <CenteredPage>
        <div>
        <img src={logo} alt="" className="mx-auto mb-0 h-14 object-contain !rounded-none" />
        <img src={text_logo_large} alt="" className="mx-auto mt-0 h-28 object-contain" />
        </div>
        <CenteredCard>
        <CardHeader>
            <CardTitle className='text-xl font-semibold text-left'>Create an account</CardTitle>
        </CardHeader>
        <CardContent className='mb-0 flex flex-col gap-3'>
        <div className='flex gap-4'>
            <FormField
            id="firstname"
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={first}
            onChange={(e) => setFirst(e.target.value)}            
          />
            <FormField
            id="lastname"
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={last}
            onChange={(e) => setLast(e.target.value)}            
          />
            </div>
            <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormField
            id="password-confirm"
            label="Confirm Password"
            type="confirm"
            placeholder="Confirm the password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
            <p className="w-full text-center text-sm text-primary font-semibold mb-0">
            Password must be at least 8 characters
            </p>
        </CardContent>
<CardFooter className="flex flex-col gap-4">
            <Button size="lg" className="w-full" onClick={() => handleSignUp()}>
            Create Account
            </Button>
            <div className="flex items-center gap-1">
            <p className='font-medium '>Already have an account?</p>
            <Button variant="link" className="font-semibold text-sm p-0 h-auto " onClick={() => navigate('/login')}>Log In</Button>
            </div>
        </CardFooter>
        </CenteredCard>
    </CenteredPage>
  )
}

export default SignUp