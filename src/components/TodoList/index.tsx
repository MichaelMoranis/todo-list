import TodoItem from "../TodoItem";

interface ListProps {
  valueItem: string[];
  isEditing: number | null;
  editInput: string;
  handleEditInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editItem: (index: number) => void;
  deleteItem: (valueItem: string) => void;
}

export default function TodoList({
  valueItem,
  isEditing,
  editInput,
  handleEditInput,
  editItem,
  deleteItem,
}: ListProps) {
  return (
    <>
    <h2 className="text-zinc-900 font-fold text-lg">items adicionados:</h2>
    <ul className="flex flex-col rounded-md gap-2 text-white w-full">
      {valueItem.map((value, index) => (
        <TodoItem
          index={index}
          key={index}
          value={value}
          isEditing={isEditing === index}
          editInput={editInput}
          handleEditInput={handleEditInput}
          editItem={() => editItem(index)}
          deleteItem={() => deleteItem(value)}
        />
      ))}
    </ul>
        
    </>
  );
}
