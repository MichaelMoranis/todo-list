import iconHeader from "../../assets/task-list.png";
import iconPlus from "../../assets/add.png";
import CurrentDate from "../Date";
import { HeaderProps } from "../../types";

// esse componente cuidara do titulo e da entrada de novos items.
export default function Header({ input, handleInput, addInput }: HeaderProps) {
  return (
    <div className="w-full text-zinc-300 bg-indigo-600">
      <div className="flex flex-col m-4 gap-2">
        <div className="flex justify-between flex-row-reverse  items-center gap-4 font-bold text-2xl">
          <div>
            <img className="h-16 w-16" src={iconHeader} alt="lista icone" />
          </div>
          <div>
            <h1>Suas Tarefas:</h1>
            <CurrentDate />
          </div>
        </div>
      </div>
      <form 
       className="flex w-full items-center bg-zinc-100 p-2 rounded-tr-3xl rounded-tl-3xl gap-2">
        <div className="flex gap-32 w-full bg-zinc-200 text-black rounded-full gap-x-4">
          <input
            className="text-black text-center p-2 mx-4 first:bg-zinc-200 w-full rounded-full font-bold placeholder-zinc-500  outline-none"
            type="text"
            name="item"
            id="item"
            value={input}
            onChange={handleInput}
            placeholder="inserir itens"
          />
        </div>
        <button
          className="flex justify-around items-center font-semibold w-32 p-2 gap-2 text-center rounded-full bg-blue-700 hover:bg-orange-500"
          type="button"
          aria-label="add"
          onClick={() => addInput(input)}
        >
          <p className="text-xl text-white">criar</p>
          <div className="w-6 h-6">
            <img src={iconPlus} />
          </div>
        </button>
      </form>
    </div>
  );
}
