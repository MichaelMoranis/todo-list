interface taskCompletedProps {
  taskCompleted: number
}

export function TaskListHeader({ taskCompleted }: taskCompletedProps) {
  return (
    <div className="flex gap-2 text-xl text-center text-zinc-700 px-2 ml-2 bg-orange-400 rounded-md w-40">
      concluidas:
      <span>{taskCompleted}</span>
    </div>
  )
}
