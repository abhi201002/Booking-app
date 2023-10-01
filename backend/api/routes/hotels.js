import express from "express"
// import Hotels from "../models/Hotels.js"
import { Delete, Post, Update, countBycity, countBytype, getHotelRoom, hotel, hotels } from "../Controller/Hotels.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const hotelsRouter = express.Router()

hotelsRouter.post('/', verifyAdmin, Post)

hotelsRouter.put('/:id', verifyAdmin, Update)

hotelsRouter.delete('/find/:id', verifyAdmin, Delete)

hotelsRouter.get('/find/:id', hotel)

hotelsRouter.get('/City', countBycity)
hotelsRouter.get('/type', countBytype)

hotelsRouter.get('/', hotels)
hotelsRouter.get('/rooms/:id', getHotelRoom)

export default hotelsRouter