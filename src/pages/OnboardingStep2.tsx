import CustomCard from '@/components/custom/CustomCard'
import { CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import logo from '@/assets/HypeUp_onb_login_logo.svg'
import { useNavigate } from 'react-router-dom'
import PageLayout from '@/components/custom/PageLayout'

function OnboardingStep2() {
  const navigate = useNavigate()

  return (
  <PageLayout centerPage maxWidth={380}>
    <CustomCard>
        <img src={logo} alt="" className="mx-auto mt-6 h-15 object-contain !rounded-none" />
      <CardHeader>
        <CardTitle className='text-xl font-semibold text-center'>How it Works</CardTitle>
        <CardDescription className='text-sm mb-2.5 font-regular text-center text-neutral-500'>The whole idea, in three parts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3 mb-3.5">
          <span className="text-2xl leading-none" aria-hidden="true">✅</span>
          <div>
            <p className='text-lg font-semibold text-left text-secondary'>Complete a task</p>
            <p className='text-md font-regular text-left text-neutral-600'>Laundry, dishes, that email you've been avoiding — anything counts.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 mb-3.5">
          <span className="text-2xl leading-none" aria-hidden="true">🙋</span>
          <div>
            <p className='text-lg font-semibold text-left text-secondary'>Ask for help</p>
            <p className='text-md font-regular text-left text-neutral-600'>Not feeling it? Post before you start and let people hype you up.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 mb-2">
          <span className="text-2xl leading-none" aria-hidden="true">🎉</span>
          <div>
            <p className='text-lg font-semibold text-left text-secondary'>Cheer each other on!</p>
            <p className='text-md font-regular text-left text-neutral-600'>Follow friends, share wins, and celebrate the small stuff together.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 mt-2">
        <Button size="lg" className="w-full" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
            <div className="flex items-center gap-1">
            <p className='font-medium '>Already have an account?</p>
            <Button variant="link" className="font-semibold text-sm p-0 h-auto " onClick={() => navigate('/login')}>Log In</Button>
            </div>
      </CardFooter>
    </CustomCard>
    </PageLayout>
  )
}

export default OnboardingStep2