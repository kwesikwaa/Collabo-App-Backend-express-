const { mongoose } = require('mongoose')
const {Gig} = require('../server/dbmodels')


const createGig = async(req,res)=>{
    // console.log('inside creategig')
    // const leaduser = 'Ga-Dambge'
    // const title = 'Katamanso'
    // const description  = '3-9 at dodowa'
    // const crew = ['Yhyhmansquad','Sometohtersquad']
    try{
        // console.log('inside try')
        const gig = await Gig.create({...req.body})
        console.log('after gig created variable')
        res.status(200).json(gig)
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

const getoneGig = async(req,res)=>{
    console.log('inside getagig')
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'quick flash Gig no dey exist'})
    }

    const gotit = await Gig.findById(id)
    
    if(gotit){
        return res.status(200).json(gotit)
    }
    return res.status(404).json({error:'Sorry gig doesnt exist'})
}

const deleteGig = async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'quick flash Gig no dey exist'})
    }
    const deleted = await Gig.findOneAndDelete({_id:id})
    if(deleted){
        return res.status(200).json({message:`successfully deleted ${deleted}`})
    }
    return res.status(404).json({error: "Nothing to delete"})

    // await Gig.findByIdAndDelete(
    //     id,
    //     (err,doc)=>{
    //         if(err){
    //             return res.status(404).json({error:"Sorry! not available"})
    //         }
    //         return res.status(200).json({msg:`Gig! Successfully deleted ${doc}`})
    //     }
    // )
    
}

const updateGig = async(req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'quick flash Gig no dey exist'})
    }
    console.log('entering update')
    const update = await Gig.findOneAndUpdate({_id:id},{...req.body})
    if(update){
        return res.status(200).json(update)
    }
    return res.status(404).json({error:"sorry we no fit update"})

    // await Gig.findByIdAndUpdate(
    //     id,{leaduser:"Agric Updated Name"},
    //     (err,doc)=>{
    //         if(err){
    //             console.log('inside error')
    //             return res.status(400).json({error:"Sorry! not available"})
    //         }
    //         console.log(doc) 
    //         console.log('update succesful')
    //         return res.status(200).json(doc)
    //     }
    // )
}

module.exports = {createGig, getGigs, getoneGig, deleteGig, updateGig}