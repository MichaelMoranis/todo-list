import trash from "../../assets/bin.png";

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
      className="flex items-center justify-between p-2 gap-y-4 bg-zinc-300 hover:bg-zinc-500 w-full h-16 rounded-md text-zinc-900 font-bold"
      key={index}
    >
      <div>{value}</div>
      <div className="flex flex-row gap-4">
        <button
          aria-label="delete-item"
          data-testid={`delete-button-${index}`}
          className="text-orange-400 h-8"
          onClick={deleteItem}
        >
          < img src={trash}  className="h-8 w-12" />
        </button>
      </div>
    </li>
  );
}
