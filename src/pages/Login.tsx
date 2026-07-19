import CenteredPage from '@/components/custom/CenteredPage'
import CenteredCard from '@/components/custom/CenteredCard'
import FormField from '@/components/custom/FormField'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import logo from '@/assets/HypeUp_onb_login_logo.svg'
import text_logo_large from '@/assets/HypeUpLarge.svg'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { validateLoginFields } from '@/lib/validation'

function Onboarding() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    
    // TODO: base this off of similar logic in the ForgotPassword screen
    // likely the error message will come through with diff ids
    // we want one for no account in database and for failed login
    

    async function handleLogin() {
        // reset error
        setError('')

        const validationError = validateLoginFields(email, password)
        if (validationError) {
            setError(validationError)
            return
        }

        // TODO: get the error here (see other examples) and use conditionals (add to below), set condotionals to each message scenario below
        
        
        if (error) {
            setError(error.message)
            
            
            // no account
            setError (<AlertCircle /> + "No account with that email or password exists.")
            // general login failed error
            setError (<AlertCircle /> + "Login failed. Pleaes try again later.")
    }

        useNavigate('/') // TODO (RVA): replace with home once screen added
}
    

    return (
        <CenteredPage>
            <div>
                <img src={logo} alt="" className="mx-auto h-16 w-16 object-contain !rounded-none" />
                <img src={text_logo_large} alt="" className="mx-auto h-35 object-contain" />
            </div>
            <CenteredCard>
                <CardHeader>
                    <CardTitle className='text-xl font-semibold text-left'>Log into your account</CardTitle>
                </CardHeader>
                <CardContent className='mb-0 flex flex-col gap-3'>
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
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="link" className="w-full text-center text-sm text-primary font-semibold p-0 h-auto" onClick={() => navigate('/forgot-password')}>
                        Forgot Password?
                    </Button>

                    {error &&(
                        <Badge variant={'destructive'}>
                           <AlertCircle /> + error
                        </Badge>
                    )}

                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button size="lg" className="w-full" onClick={() => navigate('/home')}>
                        Log In
                    </Button>
                    <div className="flex items-center gap-1">
                        <p className='font-medium '>Don't have an account?</p>
                        <Button variant="link" className="font-semibold text-sm p-0 h-auto " onClick={() => navigate('/signup')}>Sign Up </Button>
                    </div>
                </CardFooter>
            </CenteredCard>
        </CenteredPage>
    )
}


export default Onboarding