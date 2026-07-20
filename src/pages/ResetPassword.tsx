import CenteredPage from '@/components/custom/CenteredPage'
import CenteredCard from '@/components/custom/CenteredCard'
import FormField from '@/components/custom/FormField'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import logo from '@/assets/HypeUp_onb_login_logo.svg'
import text_logo_large from '@/assets/HypeUpLarge.svg'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { supabase } from '@/lib/client'
import { validatePassword } from '@/lib/validation'
import { AlertCircle } from 'lucide-react'

function ResetPassword() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleUpdatePassword() {
        setError('')

        const validationError = validatePassword(password, confirm)
        if (validationError) {
            setError(validationError)
            return
        }

        try {
            setSubmitting(true)
            const { error } = await supabase.auth.updateUser({ password })

            if (error) {
                setError('Something went wrong. Please try again.')
                return
            }

            navigate('/password-success')
        } catch (requestError) {
            console.error('Password update failed:', requestError)
            setError('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
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
                    <CardTitle className='text-xl font-semibold text-left'>Change Password</CardTitle>
                </CardHeader>
                <CardContent className='mb-0 flex flex-col gap-3'>
                    <FormField
                        id="new-password"
                        label="New Password"
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={submitting}
                    />
                    <FormField
                        id="new-password-confirm"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        disabled={submitting}
                    />

                    {error && (
                        <Badge variant={'destructive'}>
                            <AlertCircle /> {error}
                        </Badge>
                    )}

                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button size="lg" className="flex-1" onClick={handleUpdatePassword} disabled={submitting}>
                        {submitting ? 'Updating...' : 'Update Password'}
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1" onClick={() => navigate('/login')}>
                        Cancel
                    </Button>
                </CardFooter>
            </CenteredCard>
        </CenteredPage>
    )
}

export default ResetPassword