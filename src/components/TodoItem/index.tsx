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
    <li className="flex justify-between p-2 gap-y-4 bg-zinc-700 hover:bg-zinc-500 w-full rounded-md text-white" key={index}>
      {isEditing ? (
        <input
          className="text-black rounded-md px-2 bg-zinc-300"
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
          <button className="hover:text-green-400" onClick={editItem}>
            <FaRegEdit />
          </button>
        )}
        <button className="text-orange-500" onClick={deleteItem}>
          <RiDeleteBin5Line />
        </button>
      </div>
    </li>
  );
}
