import app from './app.js';
import { connectDb } from './db.js';
import { PORT } from './config.js';

connectDb();
app.listen(PORT);
console.log('server on port ',PORT)
console.log(`Environment: ${process.env.NODE_ENV}`)
