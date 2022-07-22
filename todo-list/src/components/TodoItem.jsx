const TodoItem = ({ todo, onDelete, onDone }) => {
  return (
    <div className="todo-item-container">
      <span className={todo.done === true ? "done text" : "text"}>
        {todo.text}
      </span>
      <div className="actions">
        <span class="material-icons btn-done" onClick={onDone}>
          done
        </span>
        <span class="material-icons btn-delete" onClick={onDelete}>
          clear
        </span>
      </div>
    </div>
  );
};

export default TodoItem;
