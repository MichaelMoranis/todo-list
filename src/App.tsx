import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  const [input, SetInput] = useState("");
  const [valueItem, setValueItem] = useState<string[]>([]);

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

  function addInput() {
    if (input) {
      setValueItem((prevValue) => [...prevValue, input]);
      SetInput("");
    }
  }

  // atualizar valor do estado inicial input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    SetInput(e.target.value);
  }

  function deleteItem(valueItemI: string) {
    const newListValue = valueItem.filter((value) => value !== valueItemI);
    localStorage.removeItem("tasks");
    setValueItem(newListValue);
  }

  const updateItems = (items: string[]) => {
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
