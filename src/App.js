import { useEffect } from "react";
import { useState } from "react";
import TodoList from "./components/TodoList";
import todosData from "./data/todosData";
import "./App.css";

function App() {
  // todos is an array that will hold all arrays, whenever this DataTransfer, it will trigger a re-render, so we can update, we put it here in App.js so this State can be passed down to both TodoList and Todo
  const [todos, setTodos] = useState(todosData);
  console.log(todos);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      //we have to parse it, convert a js strong into an object
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  //add Todo
  const addTodo = (e) => {
    // console.log(e.target.value);
    //this is what will be assigned to what the user enter
    const newTodo = {
      id: new Date(),
      text: e.target.value,
      completed: false,
    };
    //we do not want to mutate the state directly. so we are going to call a new function, a new fresh copy of the data, react need to compare the old vs new data
    //we are setting this new function, spreading the todos to a new array the old one, and then adding a new one
    setTodos([...todos, newTodo]);
    e.target.value = "";
    // = Persistence
    //this the object, key, value. we have to convert to a string because the storage only takes string
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };

  //complete todo
  const completeTodo = (id) => {
    //we are making the todos copy, so we are not mutating the todos directly
    const todosCopy = [...todos];
    //we ar looping over the array, and checking the id of each item, we are looking to see the id that matches the id in the function parameter
    const indexOfTodo = todosCopy.findIndex((item) => item.id === id);
    //toggling on/off the completed property
    todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed;
    //give it a new copy of array
    setTodos([...todosCopy]);
    localStorage.setItem("todos", JSON.stringify([...todosCopy]));
  };

  //we need to pass it down when we render the todoList in this file, also in the TodoList itself
  const editTodoText = (id, e) => {
    const todosCopy = [...todos];
    //findIndex looks for the index of the item
    const indexOfTodo = todosCopy.findIndex((item) => item.id === id);
    todosCopy[indexOfTodo].text = e.target.value;
    //re-render is going to show your new data
    setTodos([...todosCopy]);
    e.target.value = "";
    localStorage.setItem("todos", JSON.stringify([...todosCopy]));
  };

  const deleteTodo = (id) => {
    //make a copt of the todos
    const todosCopy = [...todos];
    //look fot each index of the todosCopy we made, and see if it matches teh id we passing to deleteTodo
    const indexOfTodo = todosCopy.findIndex((item) => item.id === id);
    todosCopy.splice(indexOfTodo, 1);
    setTodos([...todosCopy]);
    localStorage.setItem('todos', JSON.stringify([...todosCopy]))
  };
  return (
    <div className="App">
      <h1>ToDos App</h1>

      {/* this renders the TodoList function/component,
      we are passing a prop(property) with the same name */}
      <TodoList
        todos={todos}
        addTodo={addTodo}
        completeTodo={completeTodo}
        editTodoText={editTodoText}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
