import React from "react";
import bin from "../../assets/bin(1).png";

interface TodoItemProps {
  value: string;
  deleteItem: () => void;
  onDragStart: (event: React.DragEvent<HTMLLIElement>, value: string) => void;
  onDragOver: (event: React.DragEvent<HTMLLIElement>) => void;
  onDrop: (event: React.DragEvent<HTMLLIElement>) => void;
  isChecked: boolean;
  toggleCompletion: () => void;
}

export default function TodoItem({
  value,
  deleteItem,
  onDragStart,
  onDragOver,
  onDrop,
  isChecked,
  toggleCompletion,
}: TodoItemProps) {
  return (
    <li
      className={`flex items-center justify-between px-4 gap-y-4 w-full h-12 rounded-2xl text-zinc-900 font-bold ${
        isChecked ? "bg-indigo-500 text-white" : "bg-zinc-300"
      }`}
      draggable
      onDragStart={(event) => onDragStart(event, value)}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex items-center">
        <input
          checked={isChecked}
          onChange={toggleCompletion}
          id="checked-checkbox"
          type="checkbox"
          className="w-6 h-6 rounded-full"
        />
        <label
          htmlFor="checked-checkbox"
          className="ms-2 rounded-full text-md font-medium"
        >
          {value}
        </label>
      </div>
      <button aria-label="delete-item" className="h-8" onClick={deleteItem}>
        <img src={bin} className="h-8 w-8" alt="Delete" />
      </button>
    </li>
  );
}
