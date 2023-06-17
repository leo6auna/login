import Task from '../models/task.model.js'

export const getTasks = async (req,res)=>{
    const tasks = await Task.find({user: req.user.payload.id}).populate('user')
    res.json(tasks)
}
export const getTask = async (req,res)=>{
    const task = await Task.findById(req.params.id)
    if (!task) res.status(402).json({message: "Task not found"})
    return res.json(task)
}
export const createTask = async (req,res)=>{
    const {title, description, date} = req.body;
    
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.payload.id
    });
    await newTask.save();
    res.json(newTask); 
}
export const deleteTask = async (req,res)=>{
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    if(!deletedTask) res.status(400).json({message: "Task not found"});
    res.sendStatus(204);
}
export const updateTasks = async (req,res)=>{
    const {title, description, date} = req.body;
    const updatedTask = await Task.findOneAndUpdate(
        { _id: req.params.id },
        {title, description, date},
        {new: true}
    );
    res.json(updatedTask)
}