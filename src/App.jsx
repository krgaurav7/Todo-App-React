import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context'
import TodoForm from './Components/ToDoForm'
import TodoItem from './Components/ToDoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) =>{
    setTodos((prev) => [{id : Date.now(),...todo},...prev])
  }

  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo: prevTodo))) 
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id ?{...prevTodo,completed : !prevTodo.completed}: prevTodo))
  }

  useEffect (() => {
    const todos = JSON.parse(localStorage.getItem("todos")) // todos - name of key
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos)) // todos - key & JSON.stringify(todos)= value
  },[todos])

  return (
  <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo,toggleComplete}}>
<div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto rounded-xl px-6 py-5 text-white bg-white/10 backdrop-blur-lg shadow-2xl border border-white/25">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => ( // () - self return in map || {} - not self return
                          <div key={todo.id}
                          className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
  </TodoProvider>
  )
}

export default App
