import { Link } from "react-router-dom"
import { UseTasks } from "../context/TasksContext"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
function TaskCard({ task }) {
    const {deleteTask} = UseTasks()
  return (
    <div className="bg-zinc-800 max-w-md w-full rounded-md p-10 border-2 border-black my-2">
        <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
            <Link to={`/tasks/${task._id}`}>Editar</Link>
            <button onClick={()=>{
                deleteTask(task._id)
            }} >Eliminar</button>
        </div>
        </header>
        <p className="text-slate-300">{task.description}</p>
        <p>{ dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  )
}

export default TaskCard