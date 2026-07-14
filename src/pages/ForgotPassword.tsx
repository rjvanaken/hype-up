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
    
    
    async function handleSendEmail() {
    setError('')
    // Save the error for error check
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    })


    if (error) {
        setError(error.message)
        return
    }

    setSent(true)
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
                    />

                    {!error && sent && (
                        <Badge variant={'success'}>
                            <CheckCircle /> An email has been sent for password recovery
                        </Badge>
                    )}

                    {!sent && error && (
                        <Badge variant={'destructive'}>
                            <AlertCircle /> email failed to send. Try again later.
                        </Badge>
                    )}

                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button size="lg" className="flex-1" onClick={() => handleSendEmail()}>
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