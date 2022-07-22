import { useState } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAdd = () => {
    if (value.length === 0) {
      return;
    }

    setTodos([...todos, { text: value, done: false }]);

    setValue("");
  };

  const deleteTodo = (todo) => {
    const filteredTodos = todos.filter((t) => t.text !== todo.text);

    setTodos(filteredTodos);
  };

  const markAsDone = (todo) => {
    const newArray = todos.map((t) => {
      if (t.text === todo.text) {
        return { text: t.text, done: true };
      }

      return t;
    });

    setTodos(newArray);
  };

  return (
    <div className="container">
      <div className="modal-container">
        <div className="input-add-container">
          <input
            className="input-text"
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
          />
          <button className="btn-add" type="button" onClick={handleAdd}>
            Adicionar
          </button>
        </div>

        {todos.map((todo) => (
          <TodoItem
            key={todo.text}
            todo={todo}
            onDelete={() => deleteTodo(todo)}
            onDone={() => markAsDone(todo)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
