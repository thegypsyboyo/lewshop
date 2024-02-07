

import nc from 'next-connect'
import db from "../../../utils/db"

import bcrypt from "bcrypt"

import { validateEmail } from '../../../utils/validation';

import User from "../../../models/User"
import { createActivationToken } from '../../../utils/token';

const handler = nc();

handler.post(async (req,res)=> {
    try {
        await db.connectDb();
        const { name, email, password } = req.body
        
        if (!name || !email || !password) {
           return res.status(400).json({ message: "Please fill in all the fields"}) 
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email."})
        }

        const user  = await User.findOne({email})
        if (user){
            return res.status(400).json({ message: "This email already exists"})
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters"})
        }

        const cryptedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ name, email, password:cryptedPassword})
        const addedUser = await newUser.save();

        const activation_token = createActivationToken({
            id: addedUser._id.toString(),
        });
        
        console.log(req.body);
        res.send(activation_token);
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

export default handler