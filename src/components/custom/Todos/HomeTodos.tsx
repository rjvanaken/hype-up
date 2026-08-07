import { useState, useRef } from 'react'
import { Bell, Check, EllipsisVertical, Pencil, Plus, Trash2, } from 'lucide-react'
import SetReminderDialog, { type ReminderDraft } from '@/components/custom/Reminders/SetReminderDialog'
import CustomCard from '@/components/custom/Shared/CustomCard'
import AppButton from '@/components/custom/Shared/AppButton'
import ActionDialog from '@/components/custom/Shared/ActionDialog'
import FormField from '@/components/custom/Shared/FormField'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipTrigger, } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export type Todo = {
  id: string
  text: string
  completed: boolean
}

type TodoCardProps = {
  todos: Todo[]
  onAddTodo?: (text: string) => void
  onEditTodo?: (id: string, text: string) => void
  onDeleteTodo?: (id: string) => void
  onSetReminder?: (todo: Todo, reminder: ReminderDraft) => void
  onViewAll?: () => void
  onToggleTodo?: (id: string) => void
}

function HomeTodos({
  todos,
  onAddTodo,
  onEditTodo,
  onDeleteTodo,
  onSetReminder,
  onViewAll,
  onToggleTodo,
}: TodoCardProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTodoText, setNewTodoText] = useState('')
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(
    null
  )

  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  const [pendingCompletionIds, setPendingCompletionIds] =
  useState<Set<string>>(new Set())

  const completionTimers = useRef<
  Map<string, ReturnType<typeof setTimeout>>
  >(new Map())

  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null)
  const [editedTodoText, setEditedTodoText] = useState('')

  const [todoForReminder, setTodoForReminder] = useState<Todo | null>(null)

  function handleAddTodo() {
    const trimmedText = newTodoText.trim()

    if (!trimmedText) {
      return
    }

    onAddTodo?.(trimmedText)
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

    onDeleteTodo?.(todoToDelete.id)
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
    onToggleTodo?.(id)

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

function handleEditTodo() {
  const trimmedText = editedTodoText.trim()

  if (!todoToEdit || !trimmedText) {
    return
  }

  onEditTodo?.(todoToEdit.id, trimmedText)
  setTodoToEdit(null)
  setEditedTodoText('')
}

function handleReminderDialogOpenChange(isOpen: boolean) {
  if (!isOpen) {
    setTodoForReminder(null)
  }
}

function handleSaveReminder(reminder: ReminderDraft) {
  if (!todoForReminder) {
    return
  }

  onSetReminder?.(todoForReminder, reminder)
  setTodoForReminder(null)
}

  return (
    <CustomCard>
      <div className="flex flex-col gap-3">
        {/* Card header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase text-neutral-600">
            Todos
          </h2>

          <AppButton
            variant="link"
            onClick={onViewAll}
          >
            See all
          </AppButton>
        </div>

        {/* Active todos */}
        <div className="flex flex-col">
          {activeTodos.length === 0 ? (
            <p className="py-2 text-sm text-muted-foreground">
              You’re all caught up! Add a todo when you’re ready.
            </p>
          ) : (
            activeTodos.slice(0, 3).map((todo) => (
              <div
                key={todo.id}
                className="flex min-w-0 items-center gap-2 border-b py-2"
              >
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <span className="inline-flex size-6 shrink-0 items-center justify-center">
                        <Checkbox
                          checked={todo.completed || pendingCompletionIds.has(todo.id)}
                          aria-label={`Mark ${todo.text} as complete`}
                          onCheckedChange={() =>
                            handleMarkComplete(todo.id)
                          }
                        />

                        {!pendingCompletionIds.has(todo.id) && (
                          <Check
                            aria-hidden="true"
                            className="pointer-events-none absolute size-3 opacity-0 transition-opacity group-hover/check:opacity-60 group-focus-within/check:opacity-60"
                          />
                        )}
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
                    pendingCompletionIds.has(todo.id)
                      ? 'opacity-60 line-through'
                      : ''
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
                    <DropdownMenuItem
                      onClick={() => setTodoForReminder(todo)}
                    >
                      <Bell className="size-4" />
                      Set Reminder
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleOpenEditDialog(todo)}
                    >
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
            ))
          )}
        </div>

        {/* Completed todos */}
        {completedTodos.length > 0 && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase text-neutral-600">
              Completed
            </p>

            <div className="flex flex-col">
              {completedTodos.slice(0, 2).map((todo) => (
                <div
                  key={todo.id}
                  className="flex min-w-0 items-center gap-2 border-b py-2"
                >
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <span className="inline-flex size-6 shrink-0 items-center justify-center">
                          <Checkbox
                            checked={todo.completed}
                            aria-label={`Mark ${todo.text} as incomplete`}
                            onCheckedChange={() =>
                              onToggleTodo?.(todo.id)
                            }
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
                        <AppButton
                          type="button"
                          className="p-0 h-auto bg-transparent hover:bg-transparent active:bg-transparent shrink-0"
                          aria-label={`More options for ${todo.text}`}
                        >
                          <EllipsisVertical className="text-secondary size-3.5" />
                        </AppButton>
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
          </div>
        )}

        {/* Add todo shortcut */}
        <AppButton
          icon={Plus}
          className="h-7 px-3 py-2"
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add Todo
        </AppButton>

        {/* Add todo dialog */}
        <ActionDialog
          open={isAddDialogOpen}
          onOpenChange={handleDialogOpenChange}
          title="Add todo"
          footer={
            <>
              <AppButton variant="alternate" onClick={handleCancel}>
                Cancel
              </AppButton>
              <AppButton variant="default" disabled={!newTodoText.trim()} onClick={handleAddTodo}>
                Save
              </AppButton>
            </>
          }
        >
          <FormField
            className="border-1 placeholder:text-sm"
            id="new-todo"
            label="What do you need to do?"
            placeholder="e.g. Pack gym bag"
            value={newTodoText}
            maxLength={200}
            autoFocus
            onChange={(event) => setNewTodoText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleAddTodo()
            }}
          />
        </ActionDialog>

        {/* Delete confirmation dialog */}
        <ActionDialog
          open={todoToDelete !== null}
          onOpenChange={handleDeleteDialogOpenChange}
          title="Delete todo?"
          footer={
            <>
              <AppButton variant="alternate" onClick={() => handleDeleteDialogOpenChange(false)}>
                Cancel
              </AppButton>
              <AppButton variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </AppButton>
            </>
          }
        >
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete
            {todoToDelete ? ` "${todoToDelete.text}"?` : ' this todo?'}{' '}
            This action cannot be undone.
          </p>
        </ActionDialog>

        {/* Edit todo dialog */}
        <ActionDialog
          open={todoToEdit !== null}
          onOpenChange={handleEditDialogOpenChange}
          title="Edit todo"
          footer={
            <>
              <AppButton variant="alternate" onClick={() => handleEditDialogOpenChange(false)}>
                Cancel
              </AppButton>
              <AppButton
                variant="default"
                disabled={!editedTodoText.trim() || editedTodoText.trim() === todoToEdit?.text}
                onClick={handleEditTodo}
              >
                Save
              </AppButton>
            </>
          }
        >
          <FormField
            className="border-1 placeholder:text-sm"
            id="edit-todo"
            label="What do you need to do?"
            value={editedTodoText}
            maxLength={200}
            autoFocus
            onChange={(event) => setEditedTodoText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleEditTodo()
            }}
          />
        </ActionDialog>

        {/* Set reminder dialog */}
        <SetReminderDialog
          open={todoForReminder !== null}
          initialLabel={todoForReminder?.text}
          onOpenChange={handleReminderDialogOpenChange}
          onSave={handleSaveReminder}
        />
      </div>
    </CustomCard>
  )
}

export default HomeTodos