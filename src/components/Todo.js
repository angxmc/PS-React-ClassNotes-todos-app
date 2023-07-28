import { useState } from "react";
function Todo(props) {
  // this todo is from the Todo
  const { todo, completeTodo, editTodoText, deleteTodo } = props;
  console.log(todo);

  //we want the text box in the todoList to show only when we click on the text
  const [showInput, setShowInput] = useState(false);
  return (
    <div>
      <li onClick={() => setShowInput(!showInput)}>{todo.text}</li>
      {/* this is going to be hidden until the user clicks on this text */}
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editTodoText(todo.id, e);
            setShowInput(false);
          }
        }}
        style={{ display: showInput ? "block" : "none" }}
      />
      {/* checkbox */}
      <label>
        Complete
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
      </label>

      {/* delete todo */}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}
export default Todo;
