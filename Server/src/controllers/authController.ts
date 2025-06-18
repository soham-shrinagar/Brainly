import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import user from "../models/userModel";
import z from "zod";
import { Request, Response } from "express";

export const registration = async (req: Request, res: Response) => {
    try{
       const requireBody = z.object({
        username: z.string().min(3).max(25),
        email: z.string().min(5).max(20).email(),
        password: z.string().min(3).max(10)
       })

       const safeParseData = requireBody.safeParse(req.body);
       if(!safeParseData.success){
        res.status(400).json({
            message: "Invalid Form",
            error: safeParseData.error
        })
        return;
       }

       const { username, email, password } = safeParseData.data;
        
       //checking whether the user had provided all necesarry things
       if(!username || !email || !password){
        res.status(400).json({
            message: "All fields are mandatory"
        })
        return;
       }

       //checking whether the email already exists or not
       const checkEmail = await user.findOne({
        email: email
       })

       if(checkEmail){
        res.status(400).json({
            message: "email already exists"
        })
        return;
       }

       //hashing and storing the password in the database
       const hashedPassword = await bcrypt.hash(password, 6);

       const newUser = new user({
        username: username,
        email: email,
        password: hashedPassword
       })

       await newUser.save();

       res.status(201).json({
        message: "User sucessfully created"
       })
    }catch(err: unknown){
        if(err instanceof Error){
            console.log("Something went wrong while receiving data", err.message);
        }else{
            console.log("Something went wrong while receiving data", err);
        }

        res.status(500).send({
            message: "Something went wrong while receiving data"
        })

        return;
    }
}

export const login = async(req: Request, res: Response) => {
    try{
        const requireBody = z.object({
            email: z.string().min(5).max(20).email(),
            password: z.string().min(5).max(10)
        })

        const safeParseData = requireBody.safeParse(req.body);
        if(!safeParseData.success){
            res.status(400).json({
                message: "Invalid Form",
                error: safeParseData.error
            })
            return;
        }

        const { email, password } = safeParseData.data;

        if(!email || !password){
            res.status(400).json({
                message: "All fields are mandatory"
            })
            return;
        }

        const User = await user.findOne({
            email: email
        })

        if(!User || !User.password){
            res.status(400).json({
                message: "User not found or password is missing"
            })
            return;
        }

        const matchPassword = await bcrypt.compare(password, User.password);
        
        if(!matchPassword){
            res.status(400).json({
                message: "Incorrect Password"
            })
            return;
        }

        //generating token 
        if(!process.env.SECRET_KEY){
            throw new Error("Value not available");
        }

        const token = jwt.sign({userID: User._id}, process.env.SECRET_KEY,{
            expiresIn: "1h"
        });

        res.status(200).json({
            message: "You have logged in successfully",
            token: token,
            userID: User._id
        })

        return;

    }catch(err){
        console.log("Something gone wrong ", err);
        res.status(500).json({
            message: "Something went wrong"
        })
        return;
    }
}