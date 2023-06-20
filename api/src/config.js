export const PORT = process.env.PORT || 3000

export const MONGODB_URI =
  process.env.MONGODB_URI || "localhost:27017/merndb";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'some secret key';

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";