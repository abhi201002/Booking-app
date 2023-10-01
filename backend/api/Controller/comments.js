import Hotels from "../models/Hotels.js"
import comments from "../models/comments.js"
import express from "express"


export const getcomments = async(req, res, next) => {
    try{
        const comment = await comments.findById(req.params.id)
        res.status(200).json(comment)
    }
    catch(err){
        next(err)
    }
}

export const postComments = async(req, res, next) =>{
    const comment = new comments(req.body)
    const hotel_id = req.params.hotel_id
    try {
        const result = await comment.save()
        let update;
        try {
            update = await Hotels.findByIdAndUpdate(
                hotel_id,
                {$push: {comments: result._id}},
                {new: true}
            )
            // console.log(update)
        } catch (error) {
            next(error)
        }
        res.status(200).json(update);
    } catch (error) {
        next(error)
    }
}

export const postAnswer = async(req, res, next) =>{
    const Answer = req.body
    console.log(Answer)
    const id = req.params.id
    try {
        const update = await comments.findByIdAndUpdate(
            id,
            {$push: {
                answer:Answer
            }}
            ,
            {new: true}
        )
        // console.log(update)
        res.status(200).json(update);
    } catch (error) {
        next(error)
    }
}

export const deleteQuestion = async(req, res, next) => {
    const id = req.params.id
    const hotel_id = req.params.hotel_id
    console.log(id)
    try {
        await comments.findByIdAndDelete(id)
        const response = await Hotels.findByIdAndUpdate(
            hotel_id,
            {$pull: {comments: id}},
            {new: true}
        )
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const deleteAnswer = async(req, res, next) => {
    const id = req.params.id
    const comment_id = req.params.comment_id
    try {
        const response = await comments.findByIdAndUpdate(
            comment_id,
            {$pull: {answer: {_id: id}}},
            {new: true}
        )
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}