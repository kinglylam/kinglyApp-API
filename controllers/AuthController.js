import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registeruser = async(req, res) => {
    
    const saltRounds = await bcrypt.genSalt(12)
    const hashedpass = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedpass
    const newUser = new UserModel(req.body)
    const { username } = req.body

    try {
        const olderUser = await UserModel.findOne({ username })
        if(olderUser){
            return res.status(400).json({message: "user already exist"})
        }
      const user =  await newUser.save()
        const token = jwt.sign({
            username: user.username, id:user.id
        }, process.env.JWT_KEY,{expiresIn: "1h"})
        res.status(200).json({user, token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const loginUser = async (req, res)=>{
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username:username})

        if(user)
        {
            const validity = await bcrypt.compare(password, user.password)

            if(!validity){
                res.status(400).json("wrong password")
            } else {
                const token = jwt.sign({
                    username: user.username, id:user.id
                }, process.env.JWT_KEY,{expiresIn: "1h"})
                res.status(200).json({user, token})
            }
        } else {
            res.status(404).json("user does not exists")
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}