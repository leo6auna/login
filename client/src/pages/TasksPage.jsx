import { useEffect } from "react"
import { UseTasks } from "../context/TasksContext"
import TaskCard from "../components/TaskCard"
function TasksPage() {

  const { getTasks, tasks } = UseTasks()
  
  useEffect(() => {
    getTasks();
  }, []);

  return (
  <div className="grid sm:w-full sm:grid-cols-2 lg:grid-cols-3 gap-2">
      
      {tasks.map((task)=>(
          <TaskCard task={task} key={task._id} />
        ))}
    </div>
    );
}

export default TasksPage