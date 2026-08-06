import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export type Reminder = {
  id: string
  label: string
  time: string
  days: boolean[]
  enabled: boolean
}

type ReminderRow = {
  id: string
  label: string
  time: string
  days: boolean[]
  enabled: boolean | null
}

function mapReminder(row: ReminderRow): Reminder {
  return {
    id: row.id,
    label: row.label,
    time: row.time,
    days: row.days,
    enabled: row.enabled ?? true,
  }
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadReminders() {
      setIsLoading(true)
      setError(null)

      const { data, error: loadError } = await supabase
        .from('reminders')
        .select('id, label, time, days, enabled')
        .order('created_at', { ascending: false })

      if (!isMounted) {
        return
      }

      if (loadError) {
        console.error('Unable to load reminders:', loadError)
        setError('Unable to load reminders.')
        setIsLoading(false)
        return
      }

      setReminders((data as ReminderRow[]).map(mapReminder))
      setIsLoading(false)
    }

    loadReminders()

    return () => {
      isMounted = false
    }
  }, [])

  async function addReminder(label: string, time: string, days: boolean[]) {
    const trimmedLabel = label.trim()

    if (!trimmedLabel) {
      return
    }

    setError(null)

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('Unable to identify user:', userError)
      setError('You must be signed in to set a reminder.')
      return
    }

    const { data, error: addError } = await supabase
      .from('reminders')
      .insert({
        user_id: user.id,
        label: trimmedLabel,
        time,
        days,
      })
      .select('id, label, time, days, enabled')
      .single()

    if (addError) {
      console.error('Unable to add reminder:', addError)
      setError('Unable to set reminder.')
      return
    }

    setReminders((currentReminders) => [
      mapReminder(data as ReminderRow),
      ...currentReminders,
    ])
  }

  async function updateReminder(
    id: string,
    updates: Partial<{
      label: string
      time: string
      days: boolean[]
      enabled: boolean
    }>
  ) {
    setError(null)

    const { data, error: updateError } = await supabase
      .from('reminders')
      .update(updates)
      .eq('id', id)
      .select('id, label, time, days, enabled')
      .single()

    if (updateError) {
      console.error('Unable to update reminder:', updateError)
      setError('Unable to update reminder.')
      return
    }

    const updatedReminder = mapReminder(data as ReminderRow)

    setReminders((currentReminders) =>
      currentReminders.map((reminder) =>
        reminder.id === id ? updatedReminder : reminder
      )
    )
  }

  async function toggleReminder(id: string) {
    const selectedReminder = reminders.find((reminder) => reminder.id === id)

    if (!selectedReminder) {
      return
    }

    await updateReminder(id, { enabled: !selectedReminder.enabled })
  }

  async function deleteReminder(id: string) {
    setError(null)

    const { error: deleteError } = await supabase
      .from('reminders')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Unable to delete reminder:', deleteError)
      setError('Unable to delete reminder.')
      return
    }

    setReminders((currentReminders) =>
      currentReminders.filter((reminder) => reminder.id !== id)
    )
  }

  return {
    reminders,
    isLoading,
    error,
    addReminder,
    updateReminder,
    toggleReminder,
    deleteReminder,
  }
}
