export interface TodoListProps  {
    id: number;
    newtext: string;
    isChecked: boolean;
  }

  export interface HeaderProps {
    input: string;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addInput: (newText: string) => void;
  }
  
  export interface TodoItemProps {
    value: string;
    deleteItem: () => void;
    onDragStart: (event: React.DragEvent<HTMLLIElement>, value: string) => void;
    onDragOver: (event: React.DragEvent<HTMLLIElement>) => void;
    onDrop: (event: React.DragEvent<HTMLLIElement>) => void;
  }