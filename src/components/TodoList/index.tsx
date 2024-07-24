import React, { useState } from "react";
import TodoItem from "../TodoItem";
import { TodoListProps } from "../../types";
import { TaskListPlaceholder } from "../TaskListPlaceholder";
import { TaskListHeader } from "../TasksListHeader";

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

  const taskCompleted = valueItem.filter((task) => task.isChecked);
  const totalTaskCompleted = taskCompleted.length;

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

  const handleDrop = (
    event: React.DragEvent<HTMLLIElement>,
    value: TodoListProps
  ) => {
    event.preventDefault();
    if (draggedItem !== null) {
      const draggedIndex = valueItem.findIndex(
        (item) => item.id === draggedItem.id
      );
      const dropIndex = valueItem.findIndex((item) => item.id === value.id);
      const newList = [...valueItem];
      newList.splice(draggedIndex, 1);
      if (draggedIndex < dropIndex) {
        newList.splice(dropIndex, 0, draggedItem);
      } else {
        newList.splice(dropIndex, 0, draggedItem);
      }
      updateItems(newList);
      setDraggedItem(null);
    }
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedItems = valueItem.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    updateItems(updatedItems);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {valueItem.length > 0 ? (
        <ul className="flex flex-col rounded-md gap-2 text-white w-full">
          <TaskListHeader taskCompleted={totalTaskCompleted} />
          {valueItem.map((value) => (
            <TodoItem
              key={value.id}
              value={value.newtext}
              deleteItem={() => deleteItem(value.id)}
              onDragStart={(event) => handleDragStart(event, value)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, value)}
              isChecked={value.isChecked}
              toggleCompletion={() => toggleTaskCompletion(value.id)}
            />
          ))}
        </ul>
      ) : (
        <TaskListPlaceholder />
      )}
    </div>
  );
}
