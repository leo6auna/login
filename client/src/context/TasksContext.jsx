import  { createContext,useContext, useState } from 'react'
const TasksContext = createContext()

export const UseTasks = () =>{
    const context = useContext(TasksContext);

    if(!context) {
        throw new Error ('Must be used whitin a task provider')
    }
    return context
}

export function TaskProvider({children}) {
    const [tasks, setTasks] = useState(['tarea'])
    return(
        <TasksContext.Provider value={{tasks}}> 
            {children} 
        </TasksContext.Provider>
    )
}