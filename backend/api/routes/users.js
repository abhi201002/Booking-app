import express from "express"
import { Delete, Update, user, users } from "../Controller/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const usersRouter = express.Router()

// usersRouter.get('/checkauth', verifyToken, (req, res, err) =>{
//     res.send("Logged In")
// })

// usersRouter.get('/checkUser/:id', verifyUser, (req, res, err) =>{
//     res.send("Logged In And Can delete")
// })

// usersRouter.get('/checkAdmin/:id', verifyAdmin, (req, res, err) =>{
//     res.send("Logged In And Can delete Admin")
// })

usersRouter.put('/update', Update)

usersRouter.delete('/:id',verifyUser, Delete)

usersRouter.get('/:id',verifyUser, user)

usersRouter.get('/',verifyAdmin, users)


export default usersRouter