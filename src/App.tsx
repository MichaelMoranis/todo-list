import React, { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { TodoListProps } from "./types";
import rotate from "./assets/rotate.png";

function App() {
  const [input, SetInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [valueItem, setValueItem] = useState<TodoListProps[]>([]);

  // useEffect(() => {
  //   setLoading(true);
  //   listInput();
  // }, []);
  // atualizar valor do estado inicial input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    SetInput(e.target.value);
  }

  async function listInput() {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(
        "https://todo-server-zdjm.onrender.com/tasks",
        {
           method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      const dataTask = await response.json();
      console.log(dataTask)
      if (!response.ok) {
        throw new Error(`erro: ${response.text}`);
      }
      setValueItem(dataTask);
    } catch (error) {
      console.log("deu erro no get");
    } finally {
      setLoading(false);
    }
  }

  // funcao para adicionar elementos na lista
  async function addInput(newText: string) {
    const token = localStorage.getItem("token")
    // Verifica se o texto não está vazio
    if (newText.trim() === "") {
      return;
    }
    const newInput = {
      newtext: newText,
      isChecked: false,
    };

    if(!token) {
      console.error("token ausente, nao eh possivel adicionar tarefas")
    }
    try {
      const response = await fetch(
        "https://todo-server-9m5t.onrender.com/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(newInput),
        },
      );

      listInput();

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
      SetInput(""); // Certifique-se de que SetInput esteja definido e faça sentido no contexto
    } catch (error) {
      console.error("Erro ao adicionar tarefas:", error);
    }
  }

  // funcao para deletar itens na lista
  async function deleteItem(id: number) {
    try {
      const deleteTask = await fetch(
        `https://todo-server-9m5t.onrender.com/tasks/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!deleteTask.ok) {
        console.log("erro ao deletar");
      }
      listInput();
    } catch {
      console.log("erro ao deletar");
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
          <div className="flex flex-col w-full rounded-md my-4">
            {loading ? (
              <p className="font-bold text-orange-600 text-center h-4 w-4">
                <img src={rotate} alt="rotate" />
              </p>
            ) : (
              <TodoList
                valueItem={valueItem}
                deleteItem={deleteItem}
                updateItems={updateItems}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
