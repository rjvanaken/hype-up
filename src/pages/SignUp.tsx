import CenteredCard from '@/components/custom/CenteredCard'
import CenteredPage from '@/components/custom/CenteredPage'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import logo from '@/assets/HypeUp_onb_login_logo.svg'
import text_logo_large from '@/assets/HypeUpLarge.svg'
import { useNavigate } from 'react-router-dom'
import { Input } from '@base-ui/react'
import { Label } from '@/components/ui/label'

function Onboarding() {
  const navigate = useNavigate()

  return (
    <CenteredPage>
        <div>
        <img src={logo} alt="" className="mx-auto mb-0 h-16 w-16 object-contain !rounded-none" />
        <img src={text_logo_large} alt="" className="mx-auto mt-0 h-35 object-contain" />
        </div>
        <CenteredCard>
        <CardHeader>
            <CardTitle className='text-xl font-semibold text-center'>Log into your account</CardTitle>
        </CardHeader>
        <CardContent className='mb-0'>
        <div className='flex gap-2'>
            <div className='flex flex-col gap-1'>
                <Label></Label>
                <Input></Input>
            </div>
            <div className='flex flex-col gap-1'>
                <Label></Label>
                <Input></Input>
            </div>
            </div>
            <Label htmlFor='email' className="text-left text-sm font-medium text-secondary">Email Address</Label>
            <Input id='email' type='email' placeholder='Enter your email address' className="mb-2 pb-2 pt-2 pl-2 pr-2 w-full border-2 border-neutral-300"></Input>
            <Label htmlFor='password' className="text-left text-sm font-medium text-secondary">Password</Label>
            <Input id='email' type='password' placeholder='Enter your password' className="mb-2 pb-2 pt-2 pl-2 pr-2 w-full border-2 border-neutral-300"></Input>
            <Button variant="link" className="w-full text-center text-sm text-primary font-semibold mb-0" onClick={() => navigate('/login')}>
            Forgot Password?
            </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 mt-0">
            <Button size="lg" className="w-full" onClick={() => navigate('/')}>
            Log in
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