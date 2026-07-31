import { useEffect, useRef, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import FormField from '@/components/custom/Shared/FormField'
import SettingsRowLabel from '@/components/custom/Shared/SettingsRowLabel'
import SettingsToggleRow from '@/components/custom/Shared/SettingsToggleRow'
import AppButton from '@/components/custom/Shared/AppButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/client'

const AVATAR_BUCKET = 'avatars'

function splitName(name: string): [string, string] {
  const [first, ...rest] = name.trim().split(/\s+/)
  return [first ?? '', rest.join(' ')]
}

function ProfileSettingsContent() {
  const [userId, setUserId] = useState<string | null>(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [savedFirstName, setSavedFirstName] = useState('')
  const [savedLastName, setSavedLastName] = useState('')
  const [nameError, setNameError] = useState('')

  const [location, setLocation] = useState('')
  const [savedLocation, setSavedLocation] = useState('')

  const [bio, setBio] = useState('')
  const [savedBio, setSavedBio] = useState('')

  const [showStreak, setShowStreak] = useState(true)
  const [streakError, setStreakError] = useState('')

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarPath, setAvatarPath] = useState<string | null>(null)
  const [avatarColor, setAvatarColor] = useState<string | null>(null)
  const [avatarBusy, setAvatarBusy] = useState(false)
  const [avatarError, setAvatarError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user
      if (!user) return
      setUserId(user.id)

      const { data: profile } = await supabase
        .from('profiles')
        .select('name, bio, location, avatar_storage_path, avatar_color, show_streak')
        .eq('id', user.id)
        .maybeSingle()

      if (!profile) return

      const [first, last] = splitName(profile.name ?? '')
      setFirstName(first)
      setLastName(last)
      setSavedFirstName(first)
      setSavedLastName(last)
      setLocation(profile.location ?? '')
      setSavedLocation(profile.location ?? '')
      setBio(profile.bio ?? '')
      setSavedBio(profile.bio ?? '')
      setShowStreak(profile.show_streak ?? true)
      setAvatarColor(profile.avatar_color)
      setAvatarPath(profile.avatar_storage_path)

      if (profile.avatar_storage_path) {
        const { data: urlData } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(profile.avatar_storage_path)
        setAvatarUrl(urlData.publicUrl)
      }
    })
  }, [])

  async function handleSaveName() {
    const trimmedFirst = firstName.trim()
    const trimmedLast = lastName.trim()
    if (trimmedFirst === savedFirstName && trimmedLast === savedLastName) return

    if (!trimmedFirst || !trimmedLast) {
      setNameError('First and last name are required.')
      return
    }
    setNameError('')

    const initials = `${trimmedFirst[0]}${trimmedLast[0]}`.toUpperCase()
    const { error } = await supabase
      .from('profiles')
      .update({ name: `${trimmedFirst} ${trimmedLast}`, initials })
      .eq('id', userId)

    if (error) {
      setNameError('Something went wrong. Please try again.')
      return
    }

    setSavedFirstName(trimmedFirst)
    setSavedLastName(trimmedLast)
  }

  async function handleSaveLocation() {
    const trimmed = location.trim()
    if (trimmed === savedLocation) return

    const { error } = await supabase.from('profiles').update({ location: trimmed }).eq('id', userId)
    if (!error) setSavedLocation(trimmed)
  }

  async function handleSaveBio() {
    const trimmed = bio.trim()
    if (trimmed === savedBio) return

    const { error } = await supabase.from('profiles').update({ bio: trimmed }).eq('id', userId)
    if (!error) setSavedBio(trimmed)
  }

  async function handleToggleStreak(checked: boolean) {
    setShowStreak(checked)
    setStreakError('')

    const { error } = await supabase.from('profiles').update({ show_streak: checked }).eq('id', userId)
    if (error) {
      setShowStreak(!checked)
      setStreakError('Something went wrong. Please try again.')
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !userId) return

    setAvatarError('')
    setAvatarBusy(true)

    const ext = file.name.split('.').pop()
    const path = `${userId}/avatar.${ext}`
    const { error: uploadError } = await supabase.storage.from(AVATAR_BUCKET).upload(path, file, { upsert: true })
    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      setAvatarBusy(false)
      setAvatarError('Something went wrong uploading your photo.')
      return
    }

    const { error } = await supabase.from('profiles').update({ avatar_storage_path: path }).eq('id', userId)
    setAvatarBusy(false)

    if (error) {
      console.error('Error saving avatar path:', error)
      setAvatarError('Something went wrong. Please try again.')
      return
    }

    const { data: urlData } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path)
    setAvatarPath(path)
    setAvatarUrl(`${urlData.publicUrl}?t=${Date.now()}`)
  }

  async function handleDeleteAvatar() {
    if (!userId || !avatarPath) return

    setAvatarError('')
    setAvatarBusy(true)

    await supabase.storage.from(AVATAR_BUCKET).remove([avatarPath])
    const { error } = await supabase.from('profiles').update({ avatar_storage_path: null }).eq('id', userId)
    setAvatarBusy(false)

    if (error) {
      setAvatarError('Something went wrong. Please try again.')
      return
    }

    setAvatarPath(null)
    setAvatarUrl(null)
  }

  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase()

  return (
    <>
      <div className="flex items-center gap-6">
        <div className="w-56 shrink-0">
          <SettingsRowLabel id="avatar" label="Avatar Photo" subtitle="Upload a personal avatar photo" />
        </div>
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
            <AvatarFallback
              style={avatarColor ? { backgroundColor: avatarColor } : undefined}
              className={cn('font-semibold text-white', !avatarColor && 'bg-primary')}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <AppButton variant="outline" onClick={() => fileInputRef.current?.click()} disabled={avatarBusy}>
            Upload Photo
          </AppButton>
          {avatarUrl && (
            <button
              type="button"
              onClick={handleDeleteAvatar}
              disabled={avatarBusy}
              className="text-sm font-medium text-destructive hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {avatarError && (
        <Badge variant="destructive">
          <AlertCircle /> {avatarError}
        </Badge>
      )}

      <div>
        <FormField
          id="first-name"
          label="First Name"
          subtitle="Shown in full across the app"
          variant="horizontal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={handleSaveName}
        />
      </div>

      <div>
        <FormField
          id="last-name"
          label="Last Name"
          subtitle="Your last name (shown as initial on global feed)"
          variant="horizontal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onBlur={handleSaveName}
        />
        {nameError && (
          <Badge variant="destructive" className="mt-2">
            <AlertCircle /> {nameError}
          </Badge>
        )}
      </div>

      <FormField
        id="location"
        label="Location"
        subtitle="Optional — shown on your profile"
        variant="horizontal"
        placeholder="e.g. New York, MA"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onBlur={handleSaveLocation}
      />

      <FormField
        id="bio"
        label="Bio"
        subtitle="Optional — tell people about yourself"
        variant="horizontal"
        multiline
        placeholder="Tell people a little about yourself..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        onBlur={handleSaveBio}
      />

      <div>
        <SettingsToggleRow
          id="show-streak"
          label="Show Streak on Profile"
          subtitle="Display your streak for others to see"
          checked={showStreak}
          onCheckedChange={handleToggleStreak}
        />
        {streakError && (
          <Badge variant="destructive" className="mt-2">
            <AlertCircle /> {streakError}
          </Badge>
        )}
      </div>
    </>
  )
}

export default ProfileSettingsContent
