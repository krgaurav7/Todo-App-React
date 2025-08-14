import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todos : [
        {
            id: 1,
            todo: "Complete React",
            completed : false,
        }
    ], // todo list
    addTodo : (todo) => {}, // just decleare the function
    updateTodo : (id, todo) => {}, // update todo msg  function
    deleteTodo : (id) => {}, // delete todo msg function 
    toggleComplete : (id) => {}, // toggle todo msg completed or not fun
})

export const useTodo = ()=>{

    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider