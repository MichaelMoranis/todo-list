import React, { useState } from "react";
import TodoItem from "../TodoItem";

interface ListProps {
  valueItem: string[];
  deleteItem: (valueItem: string) => void;
  updateItems: (items: string[]) => void;
}

export default function TodoList({
  valueItem,
  deleteItem,
  updateItems,
}: ListProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLLIElement>,
    value: string
  ) => {
    setDraggedItem(value);
    event.dataTransfer.setData("text/plain", value);
    event.dataTransfer.dropEffect = "move";
  };
  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event: React.DragEvent<HTMLLIElement>, value: string) => {
    event.preventDefault();
    if (draggedItem !== null) {
      const draggedIndex = valueItem.indexOf(draggedItem);
      const dropIndex = valueItem.indexOf(value);
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
        {valueItem.map((value, index) => (
          <TodoItem
            key={index}
            value={value}
            deleteItem={() => deleteItem(value)}
            onDragStart={(event) => handleDragStart(event, value)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, value)}
          />
        ))}
      </ul>
    </>
  );
}
