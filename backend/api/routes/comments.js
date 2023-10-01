import { deleteAnswer, deleteQuestion, getcomments, postAnswer, postComments } from "../Controller/comments.js";
import express from "express"

const commentsRouter = express.Router()

commentsRouter.get('/comment/:id', getcomments)
commentsRouter.post('/hotelCom/:hotel_id', postComments)
commentsRouter.put('/answer/:id', postAnswer)
commentsRouter.put('/delete/answer/:id/:comment_id', deleteAnswer)
commentsRouter.delete('/delete/question/:id/:hotel_id', deleteQuestion)

export default commentsRouter

// commentsRouter.get('/comments/:id', getComments)