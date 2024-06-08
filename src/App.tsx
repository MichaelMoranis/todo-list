import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiPlusSquare } from "react-icons/fi";

function App() {
  const [input, SetInput] = useState("");
  const [valueItem, setValueItem] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("")

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    SetInput(e.target.value);
  }
  function addInput() {
    setValueItem((prevValue) => [...prevValue, input]);
    SetInput("");
  }

  function handleEditInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEditInput(e.target.value);
  }

  // aqui estamos editando a tarefa especifica que foi clicada // libera a possibilidade de editar o item apenas
  function editItem(index: number) {
    setIsEditing(index);
    setEditInput(valueItem[index]);
  }

  // funcao que salva a edicao do item 
  function saveEdit(index: number) {
    const newValueItem = valueItem.slice()
    newValueItem[index] = editInput;
    setValueItem(newValueItem)
    setIsEditing(null)
    setEditInput("")
  }

  function deleteItem(valueItemI: string) {
    const newListValue = valueItem.filter((value) => value !== valueItemI);
    setValueItem(newListValue);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-zinc-700">
      <div className="flex flex-col gap-4 p-4 w-96 bg-zinc-800 rounded-md">
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
            <button className="bg-zinc-700 px-4 rounded-full" type="button" onClick={() => addInput()}>
              adicionar
            </button>
          </div>
        </div>
        <div className="bg-zinc-600 rounded-md">
        <ul className="flex flex-col rounded-md p-4 gap-4 bg-zinc-900 text-white">
            {valueItem.map((value, index) => (
              <li className="flex justify-between px-4 py-2 bg-zinc-800" key={index}>
                {isEditing === index ? (
                  <input
                    className="text-black rounded-md"
                    type="text"
                    value={editInput}
                    onChange={handleEditInput}
                  />
                ) : (
                  <div>{value}</div>
                )}
                <div className="flex flex-row gap-4">
                  {isEditing === index ? (
                    <button onClick={() => saveEdit(index)}><FiPlusSquare/></button>
                  ) : (
                    <button onClick={() => editItem(index)}>
                      <FaRegEdit />
                    </button>
                  )}
                  <button onClick={() => deleteItem(value)}>
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
