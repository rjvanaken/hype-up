import { useEffect, useState } from 'react'
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react'
import FormField from '@/components/custom/Shared/FormField'
import SettingsRowLabel from '@/components/custom/Shared/SettingsRowLabel'
import AppButton from '@/components/custom/Shared/AppButton'
import ActionDialog from '@/components/custom/Shared/ActionDialog'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/client'
import { validateEmail, validatePassword } from '@/lib/validation'

function AccountSettingsContent() {
  const [email, setEmail] = useState('')
  const [savedEmail, setSavedEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [savingEmail, setSavingEmail] = useState(false)

  const [passwordOpen, setPasswordOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const currentEmail = data.user?.email ?? ''
      setEmail(currentEmail)
      setSavedEmail(currentEmail)
    })
  }, [])

  async function handleSaveEmail() {
    const trimmed = email.trim()
    if (trimmed === savedEmail) return

    setEmailError('')

    if (!validateEmail(trimmed)) {
      setEmailError('Please enter a valid email address.')
      return
    }

    setSavingEmail(true)
    const { error } = await supabase.auth.updateUser({ email: trimmed })
    setSavingEmail(false)

    if (error) {
      setEmailError('Something went wrong. Please try again.')
      return
    }

    setSavedEmail(trimmed)
  }

  function openPasswordDialog() {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordError('')
    setShowCurrentPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
    setPasswordOpen(true)
  }

  async function handleSavePassword() {
    setPasswordError('')

    if (!currentPassword) {
      setPasswordError('Please enter your current password.')
      return
    }

    const validationError = validatePassword(newPassword, confirmPassword)
    if (validationError) {
      setPasswordError(validationError)
      return
    }

    setSavingPassword(true)

    const { error: reauthError } = await supabase.auth.signInWithPassword({ email: savedEmail, password: currentPassword })
    if (reauthError) {
      setSavingPassword(false)
      setPasswordError('Current password is incorrect.')
      return
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setSavingPassword(false)

    if (error) {
      setPasswordError('Something went wrong. Please try again.')
      return
    }

    setPasswordOpen(false)
  }

  return (
    <>
      <div>
        <FormField
          id="email"
          label="Email"
          subtitle="Your login email address"
          variant="horizontal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleSaveEmail}
          trailingIcon={email.trim() !== savedEmail ? Check : undefined}
          onTrailingIconClick={handleSaveEmail}
          disabled={savingEmail}
        />
        {emailError && (
          <Badge variant="destructive" className="mt-2">
            <AlertCircle /> {emailError}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="w-56 shrink-0">
          <SettingsRowLabel id="password" label="Password" subtitle="Change your account password" />
        </div>
        <div className="shrink-0">
          <AppButton variant="outline" onClick={openPasswordDialog}>
            Change Password
          </AppButton>
        </div>
      </div>

      <ActionDialog
        open={passwordOpen}
        onOpenChange={setPasswordOpen}
        title="Change Password"
        footer={
          <>
            <AppButton variant="alternate" onClick={() => setPasswordOpen(false)} disabled={savingPassword}>
              Cancel
            </AppButton>
            <AppButton onClick={handleSavePassword} disabled={savingPassword}>
              {savingPassword ? 'Updating...' : 'Update Password'}
            </AppButton>
          </>
        }
      >
        <FormField
          id="current-password"
          label="Current Password"
          type={showCurrentPassword ? 'text' : 'password'}
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          trailingIcon={showCurrentPassword ? EyeOff : Eye}
          onTrailingIconClick={() => setShowCurrentPassword((v) => !v)}
          disabled={savingPassword}
        />
        <FormField
          id="new-password"
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          trailingIcon={showNewPassword ? EyeOff : Eye}
          onTrailingIconClick={() => setShowNewPassword((v) => !v)}
          disabled={savingPassword}
        />
        <FormField
          id="confirm-password"
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          trailingIcon={showConfirmPassword ? EyeOff : Eye}
          onTrailingIconClick={() => setShowConfirmPassword((v) => !v)}
          disabled={savingPassword}
        />
        {passwordError && (
          <Badge variant="destructive">
            <AlertCircle /> {passwordError}
          </Badge>
        )}
      </ActionDialog>
    </>
  )
}

export default AccountSettingsContent
