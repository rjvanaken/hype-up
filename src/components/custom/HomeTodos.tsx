import CustomCard from '@/components/custom/CustomCard'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState, type FormEvent } from 'react'

export type Todo = {
  id: string
  text: string
  completed: boolean
}

type TodoCardProps = {
  todos: Todo[]
  onAddTodo?: (text: string) => void
  onViewAll?: () => void
  onToggleTodo?: (id: string) => void
}

function HomeTodos({
  todos,
  onAddTodo,
  onViewAll,
  onToggleTodo,
}: TodoCardProps) {
  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTodoText, setNewTodoText] = useState('')

  function handleAddTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

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

  return (
    <CustomCard padding="p-5">
      <div className="flex flex-col gap-3">
        {/* Card header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase text-neutral-600">
            Todos ({activeTodos.length})
          </h2>

          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-xs"
            onClick={onViewAll}
          >
            See all
          </Button>
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
                          checked={todo.completed}
                          aria-label={`Mark ${todo.text} as complete`}
                          onCheckedChange={() => onToggleTodo?.(todo.id)}
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

                <span className="min-w-0 flex-1 break-words text-sm leading-5">
                  {todo.text}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Completed todos */}
        {completedTodos.length > 0 && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase text-neutral-600">
              Completed ({completedTodos.length})
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
                            onCheckedChange={() => onToggleTodo?.(todo.id)}
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

                  <span className="min-w-0 flex-1 break-words text-sm text-muted-foreground line-through">
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add todo shortcut */}
        <Button type="button" onClick={() => setIsAddDialogOpen(true)}>
          <Plus />
          Add Todo
        </Button>

         {/* Add todo dialog */}
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={handleDialogOpenChange}
        >
          <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleAddTodo}>
              <DialogHeader>
                <DialogTitle>Add todo</DialogTitle>

                <DialogDescription className="sr-only">
                  Enter a new task for your todo list.
                </DialogDescription>
              </DialogHeader>

              <div className="py-5">
                <label
                  htmlFor="new-todo"
                  className="text-sm font-medium"
                >
                  What do you need to do?
                </label>

                <Input
                  id="new-todo"
                  value={newTodoText}
                  placeholder="e.g. Pack gym bag"
                  className="mt-2"
                  maxLength={200}
                  autoFocus
                  onChange={(event) =>
                    setNewTodoText(event.target.value)
                  }
                />
              </div>

              <DialogFooter className="grid grid-cols-2 gap-2 sm:grid sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={!newTodoText.trim()}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </CustomCard>
  )
}

export default HomeTodos