import { FaRegEdit } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

interface TodoItemProps {
  value: string;
  isEditing: boolean;
  editInput: string;
  index: number;
  saveEdit: () => void;
  deleteItem: () => void;
  editItem: () => void;
  handleEditInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TodoItem({
  value,
  isEditing,
  editInput,
  saveEdit,
  deleteItem,
  editItem,
  handleEditInput,
  index,
}: TodoItemProps) {
  return (
    <li className="flex justify-between px-4 py-2 bg-zinc-800" key={index}>
      {isEditing ? (
        <input
          className="text-black rounded-md"
          type="text"
          value={editInput}
          onChange={handleEditInput}
        />
      ) : (
        <div>{value}</div>
      )}
      <div className="flex flex-row gap-4">
        {isEditing ? (
          <button onClick={saveEdit}>
            <FiPlusSquare />
          </button>
        ) : (
          <button onClick={editItem}>
            <FaRegEdit />
          </button>
        )}
        <button onClick={deleteItem}>
          <RiDeleteBin5Line />
        </button>
      </div>
    </li>
  );
}
