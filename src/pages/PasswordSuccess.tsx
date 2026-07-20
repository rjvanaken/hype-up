import CustomCard from '@/components/custom/CustomCard'
import PageLayout from '@/components/custom/PageLayout'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

function PasswordSuccess() {
  const navigate = useNavigate()

  return (
  <PageLayout centerPage maxWidth={380}>
    <CustomCard>
            <CheckCircle className="mx-auto mt-6 h-15 w-15 text-green-600" />
      <CardHeader></CardHeader>
      <CardHeader>
        <CardTitle className='text-xl font-semibold text-center'>Password Updated</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-md font-regular text-center text-neutral-600'>Your password has successfully been updated.</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 mt-2">
        <Button size="lg" className="w-full" onClick={() => navigate('/login')}>
          Return to Login
        </Button>
      </CardFooter>
    </CustomCard>
    </PageLayout>
  )
}

export default PasswordSuccess