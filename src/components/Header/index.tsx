

// esse componente cuidara do titulo e da entrada de novos items.
interface HeaderProps {
    input: string;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addInput: () => void;
}

export default function Header({input, handleInput, addInput}: HeaderProps) {
  return (
    <div className="flex flex-col justify-center gap-2 bg-zinc-800 text-cyan-50">
      <h1>Lista de tarefas</h1>
      <div className="flex justify-between">
        <input
          className="text-white rounded-full px-2 bg-zinc-500 border-indigo-500  outline-none"
          type="text"
          name="item"
          id="item"
          value={input}
          onChange={handleInput}
        />
        <button
          className="bg-zinc-700 px-4 rounded-full"
          type="button"
          onClick={() => addInput()}
        >
          adicionar
        </button>
      </div>
    </div>
  );
}
