import { useState, useRef, type FormEvent } from 'react'
import { Bell, ChevronDown, ChevronUp, EllipsisVertical, Pencil, Plus, Trash2 } from 'lucide-react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import AppButton from '@/components/custom/Shared/AppButton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTodos } from '@/hooks/useTodos'
import type { Todo } from '@/components/custom/Todos/HomeTodos'

const VISIBLE_ROWS = 10
const ROW_HEIGHT_PX = 53

function EmptyTodos({ message }: { message: string }) {
  return <p className="py-2 text-sm text-muted-foreground">{message}</p>
}

function Todos() {
  const { todos, addTodo, deleteTodo, editTodo, toggleTodo } = useTodos()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTodoText, setNewTodoText] = useState('')
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null)
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null)
  const [editedTodoText, setEditedTodoText] = useState('')

  const [pendingCompletionIds, setPendingCompletionIds] = useState<Set<string>>(new Set())
  const completionTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const [isTodoOpen, setIsTodoOpen] = useState(true)
  const [isCompletedOpen, setIsCompletedOpen] = useState(true)

  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  function handleSetReminder(todo: Todo) {
    console.log('Set reminder for:', todo.text)
  }

  function handleAddTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedText = newTodoText.trim()

    if (!trimmedText) {
      return
    }

    addTodo(trimmedText)
    setNewTodoText('')
    setIsAddDialogOpen(false)
  }

  function handleCancel() {
    setNewTodoText('')
    setIsAddDialogOpen(false)
  }

  function handleDialogOpenChange(open: boolean) {
    setIsAddDialogOpen(open)

    if (!open) {
      setNewTodoText('')
    }
  }

  function handleDeleteDialogOpenChange(open: boolean) {
    if (!open) {
      setTodoToDelete(null)
    }
  }

  function handleConfirmDelete() {
    if (!todoToDelete) {
      return
    }

    deleteTodo(todoToDelete.id)
    setTodoToDelete(null)
  }

  function handleMarkComplete(id: string) {
    if (pendingCompletionIds.has(id)) {
      return
    }

    setPendingCompletionIds((currentIds) => {
      const updatedIds = new Set(currentIds)
      updatedIds.add(id)
      return updatedIds
    })

    const timer = setTimeout(() => {
      toggleTodo(id)

      setPendingCompletionIds((currentIds) => {
        const updatedIds = new Set(currentIds)
        updatedIds.delete(id)
        return updatedIds
      })

      completionTimers.current.delete(id)
    }, 1000)

    completionTimers.current.set(id, timer)
  }

  function handleOpenEditDialog(todo: Todo) {
    setTodoToEdit(todo)
    setEditedTodoText(todo.text)
  }

  function handleEditDialogOpenChange(open: boolean) {
    if (!open) {
      setTodoToEdit(null)
      setEditedTodoText('')
    }
  }

  function handleEditTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedText = editedTodoText.trim()

    if (!todoToEdit || !trimmedText) {
      return
    }

    editTodo(todoToEdit.id, trimmedText)
    setTodoToEdit(null)
    setEditedTodoText('')
  }

  return (
    <PageLayout maxWidth={1000}>
      <TwoColumnLayout
        main={
          <>
        <CustomCard>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold">Todos</h1>
              <p className="text-sm text-muted-foreground">Small steps, no pressure.</p>
            </div>

            <AppButton
              icon={Plus}
              className="flex-none"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add Todo
            </AppButton>
          </div>
        </CustomCard>

        <CustomCard>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase text-neutral-600">
              To Do
            </p>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={isTodoOpen ? 'Collapse to do list' : 'Expand to do list'}
              onClick={() => setIsTodoOpen((open) => !open)}
            >
              {isTodoOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </Button>
          </div>

          {isTodoOpen && (activeTodos.length === 0 ? (
            <EmptyTodos message="You're all caught up! Add a todo when you're ready." />
          ) : (
            <div
              className="flex flex-col overflow-y-auto"
              style={{ maxHeight: VISIBLE_ROWS * ROW_HEIGHT_PX }}
            >
              {activeTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex min-w-0 items-center gap-3 border-b py-3 last:border-b-0"
                >
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <span className="inline-flex size-6 shrink-0 items-center justify-center">
                          <Checkbox
                            checked={todo.completed || pendingCompletionIds.has(todo.id)}
                            aria-label={`Mark ${todo.text} as complete`}
                            onCheckedChange={() => handleMarkComplete(todo.id)}
                          />
                        </span>
                      }
                    />

                    <TooltipContent
                      side="top"
                      sideOffset={8}
                      className="pointer-events-none"
                    >
                      Mark Complete
                    </TooltipContent>
                  </Tooltip>

                  <span
                    className={`min-w-0 flex-1 break-words text-sm leading-5 transition-opacity ${
                      pendingCompletionIds.has(todo.id) ? 'opacity-60 line-through' : ''
                    }`}
                  >
                    {todo.text}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-7 shrink-0 text-muted-foreground"
                          aria-label={`More options for ${todo.text}`}
                        >
                          <EllipsisVertical className="size-4" />
                        </Button>
                      }
                    />

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSetReminder(todo)}>
                        <Bell className="size-4" />
                        Set Reminder
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => handleOpenEditDialog(todo)}>
                        <Pencil className="size-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setTodoToDelete(todo)}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ))}
        </CustomCard>

        <CustomCard>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase text-neutral-600">
              Completed
            </p>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={isCompletedOpen ? 'Collapse completed list' : 'Expand completed list'}
              onClick={() => setIsCompletedOpen((open) => !open)}
            >
              {isCompletedOpen ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </Button>
          </div>

          {isCompletedOpen && (completedTodos.length === 0 ? (
            <EmptyTodos message="No completed todos yet." />
          ) : (
            <div
              className="flex flex-col overflow-y-auto"
              style={{ maxHeight: VISIBLE_ROWS * ROW_HEIGHT_PX }}
            >
              {completedTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex min-w-0 items-center gap-3 border-b py-3 last:border-b-0"
                >
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <span className="inline-flex size-6 shrink-0 items-center justify-center">
                          <Checkbox
                            checked={todo.completed}
                            aria-label={`Mark ${todo.text} as incomplete`}
                            onCheckedChange={() => toggleTodo(todo.id)}
                          />
                        </span>
                      }
                    />

                    <TooltipContent
                      side="top"
                      sideOffset={8}
                      className="pointer-events-none"
                    >
                      Mark Incomplete
                    </TooltipContent>
                  </Tooltip>

                  <span className="min-w-0 flex-1 break-words text-sm leading-5 text-muted-foreground line-through">
                    {todo.text}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-7 shrink-0 text-muted-foreground"
                          aria-label={`More options for ${todo.text}`}
                        >
                          <EllipsisVertical className="size-4" />
                        </Button>
                      }
                    />

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setTodoToDelete(todo)}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ))}
        </CustomCard>
          </>
        }
      />

      {/* Add todo dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleAddTodo}>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Add todo</DialogTitle>

              <DialogDescription className="sr-only">
                Enter a new task for your todo list.
              </DialogDescription>
            </DialogHeader>

            <div className="py-5">
              <label htmlFor="new-todo" className="text-sm font-medium">
                What do you need to do?
              </label>

              <Input
                id="new-todo"
                value={newTodoText}
                placeholder="e.g. Pack gym bag"
                className="mt-2"
                maxLength={200}
                autoFocus
                onChange={(event) => setNewTodoText(event.target.value)}
              />
            </div>

            <DialogFooter className="grid grid-cols-2 gap-2 sm:grid sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                className="font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="font-semibold"
                disabled={!newTodoText.trim()}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <AlertDialog open={todoToDelete !== null} onOpenChange={handleDeleteDialogOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete todo?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete
              {todoToDelete ? ` "${todoToDelete.text}"?` : ' this todo?'} This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit todo dialog */}
      <Dialog open={todoToEdit !== null} onOpenChange={handleEditDialogOpenChange}>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleEditTodo}>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Edit todo</DialogTitle>

              <DialogDescription className="sr-only">
                Edit the text of your todo.
              </DialogDescription>
            </DialogHeader>

            <div className="py-5">
              <label htmlFor="edit-todo" className="text-sm font-medium">
                What do you need to do?
              </label>

              <Input
                id="edit-todo"
                value={editedTodoText}
                className="mt-2"
                maxLength={200}
                autoFocus
                onChange={(event) => setEditedTodoText(event.target.value)}
              />
            </div>

            <DialogFooter className="grid grid-cols-2 gap-2 sm:grid sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                className="font-semibold"
                onClick={() => handleEditDialogOpenChange(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="font-semibold"
                disabled={
                  !editedTodoText.trim() || editedTodoText.trim() === todoToEdit?.text
                }
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}

export default Todos
