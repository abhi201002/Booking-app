import express from "express";
import Room from "../models/Room.js";
import Hotels from "../models/Hotels.js";

export const createRoom = async (req, res, next) =>{
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotels.findByIdAndUpdate(
                hotelId,
                {$push: {rooms: savedRoom._id}}
            )
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } 
    catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) =>{
    const hotelId = req.params.hotelId
    const RoomId = req.params.id
    try {
        await Room.findByIdAndDelete(RoomId)
        try {
            await Hotels.findByIdAndUpdate(
                hotelId,
                {$pull: {rooms: RoomId}}
            )
        } catch (err) {
            next(err)
        }
        res.status(200).json("Deleted Successfully")
    } 
    catch (err) {
        next(err)
    }
}

export const updateRoom = async (req, res, next) =>{
    const RoomId = req.params.id
    try {
        const updateRoom = await Room.findByIdAndUpdate(RoomId, {$set: req.body}, {new: true})
        res.status(200).json(updateRoom)
    } 
    catch (err) {
        next(err)
    }
}

export const getRooms = async (req, res, next) =>{
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }
    catch(err){
        next(err)
    }
}

export const getRoom = async (req, res, next) =>{
    try{
        const room = await Hotels.findById(req.params.id)
        res.status(200).json(room)
    }
    catch(err){
        next(err)
    }
}

export const updateRoomAvailabity = async (req, res, next) =>{
    const RoomId = req.params.id
    try {
        await Room.updateOne(
            {"roomNumbers._id" : RoomId},
            {
                $push:{
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            }
        )
        res.status(200).json("Updated")
    } 
    catch (err) {
        next(err)
    }
}