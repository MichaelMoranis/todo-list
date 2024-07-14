import placeholder from "../../assets/placeholder.png";

export function TaskListPlaceholder() {
  return (
    <div className="flex gap-2 justify-center w-full">
      <div className="flex flex-col justify-center text-center items-center gap-2">
        <img src={placeholder} alt="Lista de tarefas vazia" className="w-28 h-28" />
        <div className="font-bold">Você ainda não tem tarefas cadastradas.</div>
        <div className="font-bold">Adicione suas tarefas.</div>
      </div>
    </div>
  );
}
