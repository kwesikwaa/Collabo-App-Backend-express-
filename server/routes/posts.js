const {createGig,getGigs,getoneGig,deleteGig, updateGig} = require('../postcontroller')
const express = require('express')
const router = express.Router()

// implement middleware later 
// router.use()

router.get('/',getGigs)

router.post('/', createGig)

router.route('/:id')
    .get(getoneGig)
    .delete(deleteGig)
    .put(updateGig)



// id middleware
// const posts = ['x','y','z']
// router.param('id',(req,res,next,id)=>{
//     // whatever later
//     // for eg get a user id to be used through other routes 
//     // eg below
//     req.post = posts[id]
//     next()
// })

module.exports = router