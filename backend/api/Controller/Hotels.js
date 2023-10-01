import express from "express"
import Hotels from "../models/Hotels.js"
import { createError } from "../utils/error.js"
import Room from "../models/Room.js"

export const hotels = async (req, res, next) =>{
    console.log("Get !")
    const {min, max, limit, ...other} = req.query
    console.log(min)
    try{
        const Hotel = await Hotels.find({...other, CheapestPrice: {$gt: min | 0, $lt: max | 99999}}).limit(10)
        res.status(200).json(Hotel)
    }
    catch(err){
        next(err)
        // res.status(500).json(err)
    }
}

export const hotel = async (req, res, next) =>{
    try{
        const Hotel = await Hotels.findById(req.params.id)
        res.status(200).json(Hotel)
    }
    catch(err){
        next(err)
        // res.status(500).json(err)
    }
}

export const Update = async (req, res, next) =>{
    try{
        const updateHotel = await Hotels.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        res.status(200).json(updateHotel)
    }
    catch(err){
        next(err)
        // res.status(500).json(err)
    }
}

export const Delete = async (req, res, next) =>{
    try{
        await Hotels.findByIdAndDelete(req.params.id, {$set : req.body}, {new : true})
        res.status(200).json("Deleted Successfully")
    }
    catch(err){
        next(err)
        // res.status(500).json(err)
    }
}

export const Post = async (req, res, next) =>{
    const newHotel = new Hotels(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch(err){
        next(err)
        // res.status(500).json(err)
    }
}

export const countBycity = async (req, res, next) =>{
    const cities = req.query.cities.split(",");
    try{
        const count = await Promise.all(cities.map(city => {
            return Hotels.countDocuments({city: city})
        }))
        res.status(201).json(count)
    }
    catch(err){
        next(err)
    }
}

export const countBytype = async (req, res, next) =>{
    try{
        const countHotel = await Hotels.countDocuments({type : "5 Star"})
        const countVilla = await Hotels.countDocuments({type : "Hotel"})
        const counthouse = await Hotels.countDocuments({type : "House"})
        const countHouse = await Hotels.countDocuments({type : "House"})
        const countghar = await Hotels.countDocuments({type : "House"})
        res.status(201).json([
            {type: "hotel", count: countHotel},
            {type: "villa", count: countVilla},
            {type: "house", count: counthouse},
            {type: "house", count: countHouse},
            {type: "ghar", count: countghar}
        ])
    }
    catch(err){
        next(err)
    }
}


export const getHotelRoom = async (req, res, next) =>{
    try{
        const hotel = await Hotels.findById(req.params.id)
        const list =  await Promise.all(hotel.rooms.map(room =>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    }
    catch(err){
        next(err)
    }
}