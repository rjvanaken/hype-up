// This file maps database columns to the Reminder type.

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

  return {
    reminders,
    isLoading,
    error,
    addReminder,
  }
}
