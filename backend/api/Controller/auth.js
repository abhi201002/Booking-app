import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (req, res, next) =>{
    console.log("Here in authorization")
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try{
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })

        await newUser.save()

        res.status(201).json("User Created Successfully")
    }
    catch(err){
        next(err)
    }
}

export const login = async (req, res, next) =>{
    console.log("Here in login")
    try{
        const user = await User.findOne({name: req.body.name})

        if(!user) return next(createError(404, "User Not found!"))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)

        if(!isCorrect) return next(createError(404, "Incorrect Password!"))

        const {password, isAdmin, ...others} = user._doc

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, "hgfcyc")
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({details: {...others}, isAdmin})
    }
    catch(err){
        next(err)
    }
}