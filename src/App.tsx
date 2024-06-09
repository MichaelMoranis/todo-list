import React, { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  const [input, SetInput] = useState("");
  const [valueItem, setValueItem] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");

  // atualizar valor do estado inicial input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    SetInput(e.target.value);
  }

  // funcao para adicionar items na lista
  function addInput() {
    setValueItem((prevValue) => [...prevValue, input]);
    SetInput("");
  }

  // funcao para pegar items que serao atualizados
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
    const newValueItem = valueItem.slice();
    newValueItem[index] = editInput;
    setValueItem(newValueItem);
    setIsEditing(null);
    setEditInput("");
  }

  function deleteItem(valueItemI: string) {
    const newListValue = valueItem.filter((value) => value !== valueItemI);
    setValueItem(newListValue);
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center p-4 justify-center gap-4 bg-zinc-600">
        <div className="flex flex-col gap-4 p-4 w-96 bg-zinc-800 rounded-md">
          <Header input={input} handleInput={handleInput} addInput={addInput} />
          <div className="bg-zinc-600 rounded-md">
            <TodoList
              valueItem={valueItem}
              isEditing={isEditing}
              editInput={editInput}
              handleEditInput={handleEditInput}
              saveEdit={saveEdit}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          </div>
        </div>
      </div>
      {/* <div className="bg-zinc-800 h-screen"></div> */}
    </>
  );
}

export default App;
