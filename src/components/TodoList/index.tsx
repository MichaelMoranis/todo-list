import React, { useState } from "react";
import TodoItem from "../TodoItem";

interface ListProps {
  valueItem: string[];
  deleteItem: (valueItem: string) => void;
  updateItems: (items: string[]) => void
}

export default function TodoList({
  valueItem,
  deleteItem,
  updateItems
}: ListProps) {

  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>, value: string) => {
    setDraggedItem(value)
    event.dataTransfer.effectAllowed = "move"
  }
  const  handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLLIElement>, value: string) => {
    event.preventDefault()
    if(draggedItem !== null) {
      const newList = valueItem.filter((item) => item !== draggedItem)
      const dropIndex = newList.indexOf(value)
      newList.splice(dropIndex, 0, draggedItem)
      updateItems(newList)
      setDraggedItem(null)
    }
  }


  return (
    <>
    <h2 className="text-zinc-900 font-fold text-lg">items adicionados:</h2>
    <ul 
      className="flex flex-col rounded-md gap-2 text-white w-full"
      >
      {valueItem.map((value, index) => (
        <TodoItem
          key={index}
          value={value}
          deleteItem={() => deleteItem(value)}
          onDragStart={(event) => handleDragStart(event, value)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event,value)}
        />
      ))}
    </ul>
        
    </>
  );
}
