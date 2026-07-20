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
import { supabase } from '@/lib/client'
import CustomCard from '@/components/custom/CustomCard'
import PageLayout from '@/components/custom/PageLayout'

function Onboarding() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    async function handleLogin() {
        // reset error
        setError('')

        const validationError = validateLoginFields(email.trim(), password)
        if (validationError) {
            setError(validationError)
            return
        }

        // Error handling for no account found and general login
        const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password: password })
        
        if (loginError) {
            if (loginError.code === 'invalid_credentials') {
                // no account
                setError ("No account with that email or password exists.")
            } else {
                // general login failed error
                setError ("Login failed. Please try again later.")
            }

            return
        }

        navigate('/home') 
    }

    return (
            <PageLayout centerPage maxWidth={380}>
            <div>
                <img src={logo} alt="" className="mx-auto h-16 w-16 object-contain !rounded-none" />
                <img src={text_logo_large} alt="" className="mx-auto h-35 object-contain" />
            </div>
            <CustomCard>
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
                           <AlertCircle />
                           {error}
                        </Badge>
                    )}

                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button size="lg" className="w-full" onClick={handleLogin}>
                        Log In
                    </Button>
                    <div className="flex items-center gap-1">
                        <p className='font-medium '>Don't have an account?</p>
                        <Button variant="link" className="font-semibold text-sm p-0 h-auto " onClick={() => navigate('/signup')}>Sign Up </Button>
                    </div>
                </CardFooter>
            </CustomCard>
        </PageLayout>
    )
}

export default Onboarding