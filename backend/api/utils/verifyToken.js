import { createError } from "./error.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;
    console.log(token)

    if(!token){
        return next(createError(400,"You are not Authenticated"))
    }

    jwt.verify(token, 'hgfcyc', (err, user) =>{
        if(err) return next(createError(401, "You are not Authenticated"));
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) =>{
    verifyToken(req, res, () => {
        console.log(req.user)
        if(req.user.id === req.params.id || req.user.isAdmin){
            return next()
        }
        else{
            next(createError(401,"Not Allowed"))
        }
    })
}

export const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, () => {
        console.log(req.user.name)
        if(req.user.isAdmin){
            return next()
        }
        else{
            next(createError(401,"Not Allowed"))
        }
    })
}