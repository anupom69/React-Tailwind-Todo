import React, { useContext, useState } from "react";
import myContex from "./MyContext";
function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className="w-[600px] mx-auto shadow-md mt-40 p-20 h-[700px]">
      <Welcome />
      <myContex.Provider value={[todos, setTodos]}>
        <Input />
        <TaskList />
      </myContex.Provider>
    </div>
  );
}

function Welcome() {
  return (
    <h2 className="underline decoration-wavy underline-offset-8 leading-8 text-text-950 text-center text-3xl py-5">
      ToDo App
    </h2>
  );
}

function Input() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useContext(myContex);
  function addToDo(e) {
    e.preventDefault();
    if (!todo) return;
    setTodos((todos) => [
      ...todos,
      { todo: todo, checked: false, id: crypto.randomUUID() },
    ]);
    setTodo("");
  }
  return (
    <form
      className="text-center border-dashed border-b-2 pb-2"
      onSubmit={addToDo}
    >
      <label className="">You Task: </label>
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="text-secondary-700 mx-3 border-2 border-secondary-200 rounded-md focus:border-secondary-500 outline-none"
        type="text"
        name="input"
      />
      <button
        type="submit"
        className="bg-secondary-400 px-2 rounded-xl py-1 text-text-50"
      >
        Add
      </button>
    </form>
  );
}

function TaskList() {
  const [todos, setTodos] = useContext(myContex);
  return (
    <ul className="columns-2">
      {todos.map((todo) => (
        <Task key={todo.id} task={todo} />
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [todos, setTodos] = useContext(myContex);
  function handleCheck(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id == id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }
  function handleDelete(id) {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }
  return (
    <li className="pt-2 flex gap-3 justify-start align-middle">
      <input className="cursor-pointer" onChange={() => handleCheck(task.id)} type="checkbox" />
      <span className={task.checked ? "line-through": ""}>{task.todo}</span>
      <button onClick={() => handleDelete(task.id)} className="text-primary-400 bg-secondary-50 px-2 py-0 rounded-xl hover:font-bold">
        x
      </button>
    </li>
  );
}
export default App;
