import type { SettingsTab } from '@/components/custom/Shared/SettingsDialog'
import AccountSettingsContent from '@/components/custom/Settings/AccountSettingsContent'
import ProfileSettingsContent from '@/components/custom/Settings/ProfileSettingsContent'
import RemindersSettingsContent from '@/components/custom/Settings/RemindersSettingsContent'

export const settingsTabs: SettingsTab[] = [
    { key: 'account', label: 'Account', title: 'Account', description: 'Manage your login email and password', content: <AccountSettingsContent /> },
    { key: 'profile', label: 'Profile', title: 'Profile', description: 'Customize how you appear to others', content: <ProfileSettingsContent /> },
    { key: 'privacy', label: 'Privacy', title: 'Privacy', description: 'Control who can see your posts and activity', content: null },
    { key: 'reminders', label: 'Reminders', title: 'Reminders', description: 'Manage default reminder behavior', content: <RemindersSettingsContent /> },
    { key: 'alerts', label: 'Alerts', title: 'Alerts', description: 'Choose what you get notified about', content: null },
]
