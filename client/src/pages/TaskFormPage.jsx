import { useForm } from "react-hook-form";
import { UseTasks } from "../context/TasksContext";


function TaskFormPage() {

  const {register, handleSubmit} = useForm();
  const onSubmit = handleSubmit((data)=>{
    console.log(data)
  })
  const { tasks } = UseTasks();
  console.log(tasks)
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h1>Agrega una nueva tarea</h1>
      <form action="" onSubmit={onSubmit}>
        <input type="text" 
        placeholder="Título" 
        id="" {...register ('title')} 
        autoFocus 
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <textarea rows="5" 
        placeholder="Descripción" 
        {...register('description')} 
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
          
        </textarea>
        <button>Guardar</button>
      </form>
    </div>
  )
}

export default TaskFormPage