import CustomCard from '@/components/custom/CustomCard'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-react'

export type Todo = {
  id: string
  text: string
  completed: boolean
}

type HomeTodosProps = {
  todos?: Todo[]
  onAddTodo?: () => void
  onViewAll?: () => void
  onToggleTodo?: (id: string) => void
}

const mockTodos: Todo[] = [
  {
    id: '1',
    text: 'Pack gym bag',
    completed: false,
  },
]

function HomeTodos({
  todos = mockTodos,
  onAddTodo,
  onViewAll,
  onToggleTodo,
}: HomeTodosProps) {
  const activeTodos = todos.filter((todo) => !todo.completed)

  return (
    <CustomCard padding="p-5">
      <div className="flex flex-col gap-4">
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

        {activeTodos.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No active todos.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {activeTodos.slice(0, 3).map((todo) => (
              <label
                key={todo.id}
                className="flex cursor-pointer items-center gap-2"
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => onToggleTodo?.(todo.id)}
                />

                <span className="text-sm">{todo.text}</span>
              </label>
            ))}
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