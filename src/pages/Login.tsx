import CenteredPage from '@/components/custom/CenteredPage'
import CenteredCard from '@/components/custom/CenteredCard'
import FormField from '@/components/custom/FormField'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import logo from '@/assets/HypeUp_onb_login_logo.svg'
import text_logo_large from '@/assets/HypeUpLarge.svg'
import { useNavigate } from 'react-router-dom'

function Onboarding() {
    const navigate = useNavigate()

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
                    />
                    <FormField
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <Button variant="link" className="w-full text-center text-sm text-primary font-semibold p-0 h-auto" onClick={() => navigate('/forgot-password')}>
                        Forgot Password?
                    </Button>
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