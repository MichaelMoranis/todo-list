import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { TodoListProps } from "./types";

function App() {
  const [input, SetInput] = useState("");
  const [valueItem, setValueItem] = useState<TodoListProps[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      } catch (e) {
        console.error("Falha ao analisar as tarefas do localStorage", e);
      }
    }
    return [];
  });
  // aqui estou atualizando o localstorage sempre que "valueItem no [array] mudar"
  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(valueItem)); 
      console.log("Tarefas salvas no localStorage:", valueItem); 
  }, [valueItem]);

  // atualizar valor do estado inicial input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    SetInput(e.target.value);
  }

  // funcao para adicionar elementos na lista
  function addInput(newText: string) {
    if (input) {
      setValueItem((prevValue: TodoListProps[]) => {
        const newInput: TodoListProps = {
          id: prevValue.length
            ? Math.max(...prevValue.map((item) => item.id)) + 1
            : 1,
          text: newText,
          isChecked: false
        };
        return [...prevValue, newInput];
      });
      SetInput("");
    }
  }

  // funcao para deletar itens na lista
  function deleteItem(id: number) {
    const newListValue = valueItem.filter((value) => value.id !== id);
    setValueItem(newListValue);
  }

  // funcao para atualizar o novo array de efeito do drag and drop
  const updateItems = (items: TodoListProps[]) => {
    setValueItem(items);
  };


  return (
    <div className="min-h-screen  bg-zinc-100 flex flex-col items-center justify-self-end">
      <Header input={input} handleInput={handleInput} addInput={addInput} />
      <div className="flex flex-col px-4 w-full  rounded-md my-4">
        <div className="placeholder:only:rounded-md">
          <TodoList
            valueItem={valueItem}
            deleteItem={deleteItem}
            updateItems={updateItems}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

