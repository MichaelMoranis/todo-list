import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  const [input, SetInput] = useState("");
  const [valueItem, setValueItem] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");


  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setValueItem(parsedTasks);
        }
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
      }
    }
  }, [])

  // aqui estou atualizando o localstorage sempre que "valueItem no [] mudar"
  useEffect(() => {
    if(valueItem.length >= 1) localStorage.setItem("tasks", JSON.stringify(valueItem));
  }, [valueItem]);


  function addInput() {
    if(input) {
      setValueItem((prevValue) => [...prevValue, input]);
      SetInput("");
    }
}

  // atualizar valor do estado inicial input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    SetInput(e.target.value);
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
    localStorage.removeItem("tasks")
    setValueItem(newListValue);
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center p-4  justify-self-end gap-4 bg-zinc-600">
      <Header input={input} handleInput={handleInput} addInput={addInput} />
        <div className="flex flex-col gap-4 p-4 w-full  rounded-md my-12">
          <div className="placeholder:only:rounded-md">
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
