interface taskCompletedProps {
    taskCompleted: number
}

export  function TaskListHeader ({taskCompleted}: taskCompletedProps ) {
    return (
        <div className="flex gap-2 text-indigo-800 text-xl">
            tarefas concluidas:
            <span>{taskCompleted}</span>
        </div>
    )
}