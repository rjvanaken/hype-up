import CustomCard from '@/components/custom/CustomCard'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-react'

export type Todo = {
  id: string
  text: string
  completed: boolean
}

type TodoCardProps = {
  todos: Todo[]
  onAddTodo?: () => void
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

  return (
    <CustomCard padding="p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase text-neutral-600">
            Todos
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
                className="flex items-center gap-2 border-b py-2"
              >
                <Checkbox
                  checked={false}
                  aria-label={`Mark ${todo.text} as complete`}
                  onCheckedChange={() => onToggleTodo?.(todo.id)}
                />

                <span className="text-sm">{todo.text}</span>
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
                  className="flex items-center gap-2 border-b py-2"
                >
                  <Checkbox
                    checked
                    aria-label={`Mark ${todo.text} as incomplete`}
                    onCheckedChange={() => onToggleTodo?.(todo.id)}
                  />

                  <span className="text-sm text-muted-foreground line-through">
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button type="button" onClick={onAddTodo}>
          <Plus />
          Add Todo
        </Button>
      </div>
    </CustomCard>
  )
}

export default HomeTodos