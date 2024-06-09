import { FiPlusSquare } from "react-icons/fi";

// esse componente cuidara do titulo e da entrada de novos items.
interface HeaderProps {
  input: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addInput: () => void;
}

export default function Header({ input, handleInput, addInput }: HeaderProps) {
  return (
    <div className="flex flex-col justify-center gap-2 w-full bg-zinc-700 text-black rounded-lg">
      <div className="flex justify-between rounded-md">
        <input
          className="text-white p-2 bg-zinc-700 w-96 placeholder-zinc-400 rounded-md outline-none"
          type="text"
          name="item"
          id="item"
          value={input}
          onChange={handleInput}
          placeholder="criar tarefas"
        />
        <button
          className="px-4 rounded-r-lg bg-orange-500 font-semibold hover:text-green-500"
          type="button"
          onClick={() => addInput()}
        >
          <FiPlusSquare className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
