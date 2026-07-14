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
                    <CardTitle className='text-xl font-semibold text-left'>Change Password</CardTitle>
                </CardHeader>
                <CardContent className='mb-0 flex flex-col gap-3'>
                    <FormField
                        id="new-password"
                        label="New Password"
                        type="password"
                        placeholder="Enter your new password"
                    />
                    <FormField
                        id="new-password-confirm"
                        label="New Password"
                        type="password"
                        placeholder="Confirm your new password"
                    />
                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button size="lg" className="w-full" onClick={() => navigate('/')}> {/*TODO: replace with change password logic*/} 
                        Update Password
                    </Button>
                    <Button size="lg" className="w-full" onClick={() => navigate('login')}> {/*TODO: we going to login if they cancel? probs?*/} 
                        Cancel
                    </Button>
                </CardFooter>
            </CenteredCard>
        </CenteredPage>
    )
}





export default Onboarding