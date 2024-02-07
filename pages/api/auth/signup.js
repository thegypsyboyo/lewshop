

import nc from 'next-connect'
import db from "../../../utils/db"

import { validateEmail } from '../../../utils/validation';

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
        console.log(req.body);
        
    } catch (error) {
        req.status(500).json({message:error.message})
    }
});

export default handler