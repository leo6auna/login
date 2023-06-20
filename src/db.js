import mongoose from 'mongoose'
import { MONGODB_URI } from './config';

export const connectDb = async()=>{
    try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected')
        }
        catch(error){
            console.log(error)
        }
}