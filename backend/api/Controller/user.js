import express from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"

export const users = async (req, res, next) =>{
    console.log("Get !")
    try{
        const User = await User.find()
        res.status(200).json(User)
    }
    catch(err){
        next(err)
        // res.status(500).json(err)
    }
}

export const user = async (req, res, next) =>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(err){
        next(err)
        // res.status(500).json(err)
    }
}

export const Update = async (req, res, next) =>{
    const user_id = req.body.name
    const new_password = req.body.new_password
    const old_password = req.body.old_password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(new_password, salt);
    try{
        const user = await User.findOne({name: user_id})
        const isCorrect = await bcrypt.compare(old_password, user.password)
        if(!isCorrect) next(createError(404, "Incorrect old password"))
        
        const updated = await User.updateOne({name: user_id}, {$set : {
            password: hash
        }}, {new : true})
        res.status(200).json("Updated")
    }
    catch(err){
        next(err)
        // res.status(500).json(err)
    }
}

export const Delete = async (req, res, next) =>{
    try{
        await User.findByIdAndDelete(req.params.id, {$set : req.body}, {new : true})
        res.status(200).json("Deleted Successfully")
    }
    catch(err){
        next(err)
        // res.status(500).json(err)
    }
}
