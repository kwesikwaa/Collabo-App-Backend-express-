const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const {User, Gig} = require('../dbmodels')
const {mongoose} = require('mongoose')



//get all projects user is  involved in 
//
router.get('/',(req, res)=>{
    req.headers
    res.send('x x x x')
    
})
router.get('/abc',(req,res)=>{
    res.send('inside abc')
})

router.get('/createproject', async (req,res)=>{
    // const {leaduser, title, description,crew,progress,media}=req.body
    // res.send('hello')
    const leaduser = 'Papa Amoah'
    const title = 'Kojo aAmoah'
    const description  = 'Description is what cant be long'
    const crew = ['Yhyhmansquad','Sometohtersquad']
    try{
        const gig = await Gig.create({leaduser, title, description,crew})
        res.status(200).json(gig)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})
// router.post()=>{}


module.exports = router