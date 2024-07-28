import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { TodoListProps } from "./types";

function App() {
  const [input, SetInput] = useState("");
  const [valueItem, setValueItem] = useState<TodoListProps[]>([]);
  // aqui estou atualizando o localstorage sempre que "valueItem no [array] mudar"


  useEffect(() => {
    listInput()
  }, [])
  // atualizar valor do estado inicial input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    SetInput(e.target.value);
  }

async function listInput() {
  try {
    const response = await fetch ("https://todo-server-gdw2.onrender.com/tasks")
    const dataTask = await response.json();

    if(!response.ok) {
      throw new Error(`erro: ${response.text}`)
    }
    setValueItem(dataTask);
  } catch(error) {
    console.log("deu erro no get")
  }
}
  // funcao para adicionar elementos na lista
async function addInput(newText: string) {
  // Verifica se o texto não está vazio
   if(newText.trim() === "") {
    return
   }
  const newInput = 
    {
      newtext: newText, 
      isChecked: false
    }
  ;

  try {
    const response = await fetch("https://todo-server-gdw2.onrender.com/tasks", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInput)
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }
    SetInput(""); // Certifique-se de que SetInput esteja definido e faça sentido no contexto

  } catch (error) {
    console.error("Erro ao adicionar tarefas:", error);
  }
  listInput()
}


  // funcao para deletar itens na lista
async function deleteItem(id: number) {
    try {
      const deleteTask = await fetch(`https://todo-server-gdw2.onrender.com/tasks/${id}`, {
        method: 'DELETE'
      })   

      if(!deleteTask.ok) {
        console.log("erro ao deletar")
      }
      listInput()   
    } catch {
      console.log("erro ao deletar")
    }
  }

  // funcao para atualizar o novo array de efeito do drag and drop
  const updateItems = (items: TodoListProps[]) => {
    setValueItem(items);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center">
      <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <Header input={input} handleInput={handleInput} addInput={addInput} />
        <div className="flex flex-col w-full rounded-md my-4">
          <div className="placeholder:only:rounded-md">
            <TodoList
              valueItem={valueItem}
              deleteItem={deleteItem}
              updateItems={updateItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default App;

