import app from './app.js';
import { connectDb } from './db.js';

connectDb();
app.listen(3000);
console.log('server on port ',3000)