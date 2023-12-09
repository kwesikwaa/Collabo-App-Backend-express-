
const { mongoose } = require('mongoose')
const {Gig} = require('../models/dbmodels')
const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,path.extname(file.originalname) + Date.now() )
    }
})

// ensures that this useer owns this data n has authorized access to take this action
// ie if you didnt make the post, you cant delete or update it
const authorizeuser = async (userid, gigid)=>{
    const gig = await Gig.findById(gigid)
    
    if(gig.leaduser !== userid){
        res.status(401)
        throw new Error('Not authorized')  
    }
}


const createGig = async(req,res)=>{
    const {lead,title,description,crew,progress,media} = req.body



    try{
        // console.log('inside try')
        const gig = await Gig.create({...req.body})
        console  .log('after gig created variable')
        res.status(201).json(gig)
    }catch(error){
        console.log('catch inside')
        res.status(400).json({error: error.message})
    }
}


const getGigs = async(req,res)=>{
    console.log('inside geALLgig')
    try{
        const gigs = await Gig.find({}).sort({createdAt: -1})
        res.status(200).json(gigs)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


const getSingleGig = async(req,res)=>{
    
    const {id} = req.params

    const gotit = await Gig.findById(id)
    
    if(gotit){
        return res.status(200).json(gotit)
    }
    return res.status(404).json({error:'Sorry gig doesnt exist'})
}

// use :id for it

const deleteGig = async(req,res)=>{
    // should bring in the particular igs id
    const {id}= req.params
    authorizeuser(req.user,id)
   
    const deleted = await Gig.findOneAndDelete({_id:id})
    if(deleted){
        return res.status(200).json({message:`successfully deleted ${deleted}`})
    }
    return res.status(404).json({error: "Nothing to delete"}) 
}


const updateGig = async(req,res)=>{
    const {id}= req.params
    authorizeuser(req.user,id)

    console.log('entering update')
    const update = await Gig.findOneAndUpdate({_id:id},{...req.body})
    if(update){
        return res.status(200).json(update)
    }
    return res.status(404).json({error:"sorry we no fit update"})
}





module.exports = {createGig, getGigs, getSingleGig, deleteGig, updateGig}