import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailabity } from "../Controller/rooms.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const roomsRouter = express.Router()

roomsRouter.post('/:hotelId', verifyAdmin, createRoom)

roomsRouter.put('/:id', verifyAdmin, updateRoom)

roomsRouter.delete('/:hotelId/:id', verifyAdmin, deleteRoom)

roomsRouter.get('/:id', getRoom)

roomsRouter.get('/', getRooms)

roomsRouter.put('/availability/:id', updateRoomAvailabity)

export default roomsRouter