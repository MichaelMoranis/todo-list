import planning from "../../assets/planning.png";

export function TaskListPlaceholder() {
  return (
    <div className="flex flex-col gap-2 mx-6 justify-center w-full">
      <div className="flex  items-center gap-2">
        <img src={planning} alt="Lista de tarefas vazia" className="w-10 h-10" />
        <div className="font-bold">voce ainda nao tem tarefas cadastradas</div>
      </div>
      <div className="font-bold">crie: organize tarefas a fazer.</div>
    </div>
  );
}
