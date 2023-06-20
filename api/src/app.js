import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { FRONTEND_URL } from './config.js';
const app = express();

app.use(cors({
    origin: 'https://login-smoky-nine.vercel.app',
    credentials: true,
}));
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser());

app.use('/api', authRoutes)
app.use('/api', tasksRoutes)

if (process.env.NODE_ENV === "production") {
    const path = await import("path");
    app.use(express.static("client/dist"));
  
    app.get("*", (req, res) => {
      console.log(path.resolve("client", "dist", "index.html") );
      res.sendFile(path.resolve("client", "dist", "index.html"));
    });
  }

export default app