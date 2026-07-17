import CenteredPage from '@/components/custom/CenteredPage'
import CenteredCard from '@/components/custom/CenteredCard'
import FormField from '@/components/custom/FormField'
import { CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import logo from '@/assets/HypeUp_onb_login_logo.svg'
import text_logo_large from '@/assets/HypeUpLarge.svg'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { supabase } from '@/lib/client'
import { CheckCircle, AlertCircle } from 'lucide-react'

function ForgotPassword() {
    const navigate = useNavigate()
    const [sent, setSent] = useState(false)
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    // Loading state to prevent multiple reset email submissions
    const [isLoading, setIsLoading] = useState(false)
    
    
    async function handleSendEmail() {
        const trimmedEmail = email.trim()
        
        setError('')
        setSent(false) // Reset sent when starting new request

        // Empty field check
        if (!trimmedEmail) {
            setError('Please enter a valid email address.')
            return
        }

        try {
            setIsLoading(true)

            // Save the error for error check
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
                redirectTo: `${window.location.origin}/reset-password`,
            })


            if (resetError) {
                setError('Email failed to send. Please try again later.')
                return
            }

            setSent(true)
        } catch (requestError) {
            console.error('Password reset request failed:', requestError)
            setError('Email failed to send. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CenteredPage>
            <div>
                <img src={logo} alt="" className="mx-auto h-16 w-16 object-contain !rounded-none" />
                <img src={text_logo_large} alt="" className="mx-auto h-35 object-contain" />
            </div>
            <CenteredCard>
                <CardHeader>
                    <CardTitle className='text-xl font-semibold text-left'>Forgot Password</CardTitle>
                    <CardDescription className='text-sm mb-0 mt-2 font-regular text-left text-neutral-500'>Enter your email and we will send you an email to update your password.</CardDescription>
                </CardHeader>
                <CardContent className='mb-0 flex flex-col gap-3'>
                    <FormField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />

                    {sent && !error && (
                        <Badge variant="success">
                            <CheckCircle />
                            An email has been sent for password reset.
                        </Badge>
                    )}

                    {error && (
                        <Badge variant="destructive">
                            <AlertCircle />
                            {error}
                        </Badge>
                    )}

                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button size="lg" className="flex-1" onClick={handleSendEmail} disabled={isLoading}>
                        Send Email
                    </Button>
                    <Button variant="outline" className="flex-1" size="lg" onClick={() => navigate('/login')}> 
                        Cancel
                    </Button>
                </CardFooter>
            </CenteredCard>
        </CenteredPage>
    )
}





export default ForgotPassword