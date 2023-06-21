import  { createContext,useContext, useState } from 'react'
import { createTaskRequest, deleteTaskRequest, getTasksRequest, getTaskRequest, updateTaskRequest } from '../api/tasks';
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

    const getTasks = async() =>{
        try {
        const res = await getTasksRequest();
        setTasks(res.data)
        } catch (error) {
            console.log(error)
        }
    }  
    
    const createTask = async(task) =>{
        const res = await createTaskRequest(task)
        setTasks(res.data)
        console.log(res)
    }

    const deleteTask = async(id) =>{
        try {
            const res = await deleteTaskRequest(id)
            if(res.status ==204) setTasks(tasks.filter((task)=> task._id !== id))
        } catch (error) {
            console.log(res)
        }

        
        
    }

    const getTask = async(id) =>{
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
         console.error(error)   
        }
    }

    const updateTask = async(id, task) =>{
        try {
            await updateTaskRequest(id, task)
            setTasks(tasks)
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <TasksContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask,
            }}
        > 
            {children} 
        </TasksContext.Provider>
    )
}