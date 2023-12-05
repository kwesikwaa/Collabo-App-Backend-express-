const {createGig,getGigs,getSingleGig,deleteGig, updateGig} = require('../postcontroller')
const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authmiddleware')

router.get('/',getGigs)

router.post('/', authenticate, createGig)

router.route('/:id')
    .get(getSingleGig)
    .delete(authenticate, deleteGig)
    .put(authenticate, updateGig)


    
module.exports = router