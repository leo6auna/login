import { get, useForm } from "react-hook-form";
import { UseTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

function TaskFormPage() {

  const {register, handleSubmit, setValue} = useForm();
  const navigate = useNavigate();
  const params = useParams();
  // const { tasks } = UseTasks();
  const {createTask, getTask, updateTask} = UseTasks();

  useEffect(()=>{
    async function loadTask(){
      if (params.id){
        const task = await getTask(params.id)
        console.log(task)
        setValue('title', task.title)
        setValue('description', task.description)
        setValue('date', dayjs.utc(task.date).format("YYYY-MM-DD"))
      }
    }

    loadTask()    
  },[])

  const onSubmit = handleSubmit((data)=>{
    const dataV = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    // dataV.date = dayjs.utc(data.date).format()
    if (params.id){
      updateTask(params.id, dataV)
    }else {
      createTask(dataV);
      
    }
    navigate('/tasks')
  })


  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h1>Agrega una nueva tarea</h1>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="title">Título</label>
        <input type="text" 
        placeholder="Título" 
        id="" {...register ('title')} 
        autoFocus 
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <label htmlFor="description">Descripción</label>
        <textarea rows="5" 
        placeholder="Descripción" 
        {...register('description')} 
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
        </textarea>

        <label htmlFor="date">Fecha</label>
        <input type="date" name="date" placeholder="fecha" {...register('date')} id=""
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
        <button className="bg-blue-500 py-2 px-2 m-2 rounded-sm">Guardar</button>
      </form>
    </div>
  )
}

export default TaskFormPage