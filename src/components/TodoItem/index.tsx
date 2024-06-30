import bin from "../../assets/bin(1).png";

interface TodoItemProps {
  value: string;
  isEditing: boolean;
  editInput: string;
  index: number;
  deleteItem: () => void;
  editItem: () => void;
  handleEditInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TodoItem({
  value,
  deleteItem,

  index,
}: TodoItemProps) {
  return (
    <li
      className="flex items-center justify-between px-4 gap-y-4 bg-zinc-300 hover:bg-indigo-500 hover:text-white w-full h-16 rounded-2xl text-zinc-900 font-bold"
      key={index}
    >
      <div>{value}</div>
      <div className="flex flex-row gap-4 items-center">
        <button
          aria-label="delete-item"
          data-testid={`delete-button-${index}`}
          className="text-orange-400 h-8"
          onClick={deleteItem}
        >
          < img src={bin}  className="h-8 w-8" />
        </button>
      </div>
    </li>
  );
}
