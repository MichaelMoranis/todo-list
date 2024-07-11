import iconHeader from "../../assets/task-list.png"
import iconPlus from "../../assets/add.png"
import CurrentDate from "../Date";
// esse componente cuidara do titulo e da entrada de novos items.
export interface HeaderProps {
  input: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addInput: (newText: string) => void;
}

export default function Header({ input, handleInput, addInput }: HeaderProps) {
  return (
    <div className="w-full text-zinc-300 bg-indigo-600">
      <div className="flex flex-col m-4 gap-2">
        <h1 className="flex items-center gap-4 font-bold text-2xl">
          <img className="h-10 w-10" src={iconHeader} alt="lista icone" />
          <div>
          Suas Tarefas:
          <CurrentDate  /> 
          </div>
        </h1>
      </div>
      <div className="bg-zinc-100 p-2 rounded-tr-3xl rounded-tl-3xl">
        <div className="flex gap-32 w-full bg-zinc-200 text-black rounded-full gap-x-2">
          <input
            className="text-black text-center p-4 mx-4 first:bg-zinc-200 w-full rounded-full font-bold placeholder-zinc-500  outline-none"
            type="text"
            name="item"
            id="item"
            value={input}
            onChange={handleInput}
            placeholder="inserir produtos"
          />
          <button
            className="flex justify-around items-center font-semibold w-24 text-center rounded-r-full"
            type="button"
            aria-label="add"
            onClick={() => addInput(input)}
          >
            <img src={iconPlus} className="w-12 h-12" />
          </button>
        </div>
      </div>
    </div>
  );
}
