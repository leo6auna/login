import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res)=>{ 
    const {email, name, password} = req.body;
      try {
            const userFound = await User.findOne({ email })
            if (userFound) return res.status(400).json(["El correo ya está en uso"])
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new User({
            email,
            name,
            password : passwordHash,
        })
        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);
        res.json({
            id: userSaved.id,
            username : userSaved.name,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
         
    }catch(error){
        res.status(500).json({message: error.message})
    } 
};
export const login = async (req, res)=>{ 
    const {email, password} = req.body;
      try {
            const userFound = await User.findOne({email})
            if (!userFound) return res.status(400).json({message: "User not found"});
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) return res.status(400).json({message: "Wrong password"})
            const token = await createAccessToken({ id: userFound._id });
            res.cookie("token", token,{
                // httpOnly: 'http://localhost:5173/',
                secure: true,
                sameSite:"none",
            });
            res.json({
                id: userFound.id,
                username : userFound.name,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            });
            return token
    }catch(error){
       return res.status(500).json({message: error.message})
    } 
};
export const logout = (req,res) =>{
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200)
};

export const verifyToken = async (req,res)=>{
    const {token} = req.cookies
    if (!token) return res.status(401).json({message: "No autorizado"})
    jwt.verify(token, TOKEN_SECRET, async (err,user)=>{
        if(err) return res.status(400).json({message: "Unauthorized"})
        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(400).json({message:"User not found"})
        res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email
        })
    })
}

export const profile = async(req,res)=>{
    console.log(req.user.payload.id)
    const userFound = await User.findById(req.user.payload.id);
    if (!userFound) return res.status(400).json({message: "User not found"});
    return res.json({
        id: userFound._id,
        email: userFound.email,
        name: userFound.name,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}