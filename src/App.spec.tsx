import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react"


beforeEach(() => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if(key === "tasks") {
      return JSON.stringify(["Task 01", "Task 02"]);
    }
    return null;
  })
})

jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});

jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('App Component', () => {
    test('adicionar novas tarefas e limpar o campo do input logo apos adicionar as tarefas', () => {
      render(<App />);

      const inputElement = screen.getByPlaceholderText("criar tarefas")
      const addButton = screen.getByRole('button', { name: /add/i }); 

      fireEvent.change(inputElement, {target: {value: "New task"}})

      fireEvent.click(addButton);

      expect(screen.getByPlaceholderText("criar tarefas")).toBeInTheDocument();

      expect(inputElement.value).toBe("")
    });

    test('remover tarefa da lista após adicionar', () => {
      render(<App />);
    
      // Encontrando e clicando no botão de delete dentro do componente TodoList
      const deleteButton = screen.getByTestId('delete-button-0'); // Substitua '0' pelo índice do item que você deseja remover
      fireEvent.click(deleteButton);
    
      // Verificação se o item foi removido (usando um seletor apropriado)
      const deletedItem = screen.queryByText("Texto do item removido"); // Substitua pelo texto específico do item removido
      expect(deletedItem).not.toBeInTheDocument();
    
      // Verificando se o campo de input foi limpo
      const inputElement = screen.getByPlaceholderText("criar tarefas");
      expect(inputElement.value).toBe("");
    });
  });