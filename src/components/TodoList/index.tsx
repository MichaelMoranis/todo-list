import TodoItem from "../TodoItem";

interface ListProps {
  valueItem: string[];
  isEditing: number | null;
  editInput: string;
  handleEditInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveEdit: (index: number) => void;
  editItem: (index: number) => void;
  deleteItem: (valueItem: string) => void;
}

export default function TodoList({
  valueItem,
  isEditing,
  editInput,
  handleEditInput,
  saveEdit,
  editItem,
  deleteItem,
}: ListProps) {
  return (
    <ul className="flex flex-col rounded-md gap-4 text-white w-full">
      {valueItem.map((value, index) => (
        <TodoItem
          index={index}
          key={index}
          value={value}
          isEditing={isEditing === index}
          editInput={editInput}
          handleEditInput={handleEditInput}
          saveEdit={() => saveEdit(index)}
          editItem={() => editItem(index)}
          deleteItem={() => deleteItem(value)}
        />
      ))}
    </ul>
  );
}
