import React, { useState } from "react";
import TodoItem from "../TodoItem";
import { TodoListProps } from "../../types";


interface ListProps {
  valueItem: TodoListProps[];
  deleteItem: (id: number) => void;
  updateItems: (items: TodoListProps[]) => void;
}

export default function TodoList({
  valueItem,
  deleteItem,
  updateItems,
}: ListProps) {
  const [draggedItem, setDraggedItem] = useState<TodoListProps | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLLIElement>,
    value: TodoListProps
  ) => {
    setDraggedItem(value);
    event.dataTransfer.setData("text/plain", value.id.toString());
    event.dataTransfer.dropEffect = "move";
  };
  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event: React.DragEvent<HTMLLIElement>, value: TodoListProps) => {
    event.preventDefault();
    if (draggedItem !== null) {
      const draggedIndex = valueItem.findIndex(item => item.id === value.id);
      const dropIndex = valueItem.findIndex(item => item.id === value.id);
      const newList = [...valueItem];
      newList.splice(draggedIndex, 1);
      if (draggedIndex < dropIndex) {
        // Arrastando de cima para baixo
        newList.splice(dropIndex, 0, draggedItem);
      }
      // Arrastando de baixo para cima
      else newList.splice(dropIndex, 0, draggedItem);

      updateItems(newList);
      setDraggedItem(null);
    }
  };

  return (
    <>
      <h2 className="text-zinc-900 font-fold text-lg">items adicionados:</h2>
      <ul className="flex flex-col rounded-md gap-2 text-white w-full">
        {valueItem.map((value) => (
          <TodoItem
            key={value.id}
            value={value.text}
            deleteItem={() => deleteItem(value.id)}
            onDragStart={(event) => handleDragStart(event, value)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, value)}
          />
        ))}
      </ul>
    </>
  );
}
