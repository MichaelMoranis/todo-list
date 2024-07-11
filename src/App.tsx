import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { TodoListProps } from "./types";


function App() {
  const [input, SetInput] = useState("");
  const [valueItem, setValueItem] = useState<TodoListProps[]>([]);

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
  }, []);

  // aqui estou atualizando o localstorage sempre que "valueItem no [array] mudar"
  useEffect(() => {
    if (valueItem.length >= 1)
      localStorage.setItem("tasks", JSON.stringify(valueItem));
  }, [valueItem]);

    // atualizar valor do estado inicial input
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      SetInput(e.target.value);
    }

    function addInput(newText: string) {
      if (input) {
        setValueItem((prevValue: TodoListProps[]) => {
          const newInput: TodoListProps = {
            id: prevValue.length ? Math.max(...prevValue.map(item => item.id)) + 1 : 1,
            text: newText
          };
          return [...prevValue, newInput];
        });
        SetInput("");
      }
    }

  function deleteItem(id: number) {
    const newListValue = valueItem.filter((value) => value.id !== id);
    setValueItem(newListValue);
  }

  const updateItems = (items: TodoListProps[]) => {
    setValueItem(items)
  }

  return (
      <div className="bg-zinc-100 flex flex-col items-center justify-self-end">
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
