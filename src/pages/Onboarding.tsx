import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import AppButton from '@/components/custom/Shared/AppButton'
import logo from '@/assets/HypeUp_onb_login_logo.svg'
import { useNavigate } from 'react-router-dom'


function Onboarding() {
  const navigate = useNavigate()

  return (
  <PageLayout centerPage maxWidth={380}>
    <CustomCard>
        <img src={logo} alt="" className="mx-auto mt-6 h-15 object-contain !rounded-none" />
      <CardHeader></CardHeader>
      <CardHeader>
        <CardTitle className='text-xl font-semibold text-center'>Welcome to <span className='font-bold'>Hype<span className="text-primary">Up</span></span></CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-md font-regular text-center text-neutral-600'>Do the thing. Share the win.<br></br>Here’s what that actually means.</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 mt-2">
        <AppButton className="w-full" onClick={() => navigate('/onboarding-step-2')}>
          Get Started
        </AppButton>
            <div className="flex items-center gap-1">
            <p className='font-medium '>Already have an account?</p>
            <AppButton variant="link" className="font-semibold text-sm p-0 h-auto " onClick={() => navigate('/login')}>Log In</AppButton>
            </div>
      </CardFooter>
    </CustomCard>
    </PageLayout>
  )
}

export default Onboarding