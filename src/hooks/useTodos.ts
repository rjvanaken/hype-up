// This file maps database columns to the Todo type.

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import type { Todo } from '@/components/custom/Todos/HomeTodos'
import { useCurrentUser } from '@/hooks/useCurrentUser'

type TodoRow = {
  id: string
  text: string
  done: boolean
}

function mapTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    text: row.text,
    completed: row.done,
  }
}

export function useTodos() {
  const { user } = useCurrentUser()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadTodos() {
      setIsLoading(true)
      setError(null)

      const { data, error: loadError } = await supabase
        .from('todos')
        .select('id, text, done')
        .order('created_at', { ascending: false })

      if (!isMounted) {
        return
      }

      if (loadError) {
        console.error('Unable to load todos:', loadError)
        setError('Unable to load todos.')
        setIsLoading(false)
        return
      }

      setTodos((data as TodoRow[]).map(mapTodo))
      setIsLoading(false)
    }

    loadTodos()

    return () => {
      isMounted = false
    }
  }, [])

  async function addTodo(text: string) {
    const trimmedText = text.trim()

    if (!trimmedText) {
      return
    }

    setError(null)

    if (!user) {
      setError('You must be signed in to add a todo.')
      return
    }

    const { data, error: addError } = await supabase
      .from('todos')
      .insert({
        user_id: user.id,
        text: trimmedText,
        done: false,
      })
      .select('id, text, done')
      .single()

    if (addError) {
      console.error('Unable to add todo:', addError)
      setError('Unable to add todo.')
      return
    }

    setTodos((currentTodos) => [
      mapTodo(data as TodoRow),
      ...currentTodos,
    ])
  }

  async function toggleTodo(id: string) {
    const selectedTodo = todos.find((todo) => todo.id === id)

    if (!selectedTodo) {
      return
    }

    const nextCompleted = !selectedTodo.completed

    setError(null)

    const { data, error: toggleError } = await supabase
      .from('todos')
      .update({
        done: nextCompleted,
        completed_at: nextCompleted
          ? new Date().toISOString()
          : null,
      })
      .eq('id', id)
      .select('id, text, done')
      .single()

    if (toggleError) {
      console.error('Unable to update todo:', toggleError)
      setError('Unable to update todo.')
      return
    }

    const updatedTodo = mapTodo(data as TodoRow)

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      )
    )
  }

  async function editTodo(id: string, text: string) {
    const trimmedText = text.trim()

    if (!trimmedText) {
      return
    }

    setError(null)

    const { data, error: editError } = await supabase
      .from('todos')
      .update({ text: trimmedText })
      .eq('id', id)
      .select('id, text, done')
      .single()

    if (editError) {
      console.error('Unable to edit todo:', editError)
      setError('Unable to edit todo.')
      return
    }

    const updatedTodo = mapTodo(data as TodoRow)

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      )
    )
  }

  async function deleteTodo(id: string) {
    setError(null)

    const { error: deleteError } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Unable to delete todo:', deleteError)
      setError('Unable to delete todo.')
      return
    }

    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    )
  }

  return {
    todos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
    editTodo,
    toggleTodo,
  }
}