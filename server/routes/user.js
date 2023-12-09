const express = require('express')
const { newUser, login } = require('../controllers/usercontroller')
const router = express.Router()


router.post('/',newUser)
router.post('/login',login)


module.exports =router