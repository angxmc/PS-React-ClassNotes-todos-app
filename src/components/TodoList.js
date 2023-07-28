import Todo from "./Todo";
function TodoList(props) {
  // we are now receiving the todos from prop
  const { todos, addTodo, completeTodo, editTodoText, deleteTodo } = props;
  // const {todos, addTodo} = props;
  // const todos = props.todos
  // const addTodo = props.todos, this is equivalent to the above line
  console.log("from todoList", todos);
  return (
    <div>
      <h1>Create Todo</h1>
      {/* here we check if it's the enter key */}
      <input type="text" onKeyDown={(e) => e.key === "Enter" && addTodo(e)} />
      {/* 
      We want to use .map to loop over and decide how many we want
      <Todo/>
      <Todo/>
      <Todo/>
      <Todo/>
      <Todo/>
      <Todo/>
  <Todo/> */}
      {
        //we are checking if there is length in todos, if there is we are going to return ToDo items, else, No Todos
        todos.length ? (
          <>
            <h2>ToDos Items</h2>
            <ul>
              {
                //we are filtering out the ones that's not completed
                todos
                  .filter((item) => !item.completed)
                  //we are mapping over the todos and for each todo/item, we are rendering Todo
                  .map((item) => (
                    //we are passing the value of each item in the array into todo property, and into the Todo Component, it is accepting all the items in the array
                    <Todo
                      key={item.id}
                      todo={item}
                      completeTodo={completeTodo}
                      editTodoText={editTodoText}
                      deleteTodo={deleteTodo}
                    />
                  ))
              }
            </ul>

            <h2>Completed Todos</h2>
            <ul className="classList">
              {todos
                .filter((item) => item.completed)
                .map((item) => (
                  <Todo
                    key={item.id}
                    todo={item}
                    completeTodo={completeTodo}
                    editTodoText={editTodoText}
                    deleteTodo={deleteTodo}
                  />
                ))}
            </ul>
          </>
        ) : (
          <h2>No todos</h2>
        )
      }
    </div>
  );
}
export default TodoList;
