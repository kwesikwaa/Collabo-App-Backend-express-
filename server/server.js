const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

require ('dotenv').config()

const app = express()

const mongourl = process.env.MONGO 

const postsRouter = require('./routes/posts')
const userRouter = require('./routes/user')


app.use(cors())
app.use(express.json())
// app.use(cookieParser())
app.use(morgan('tiny'))


const port = process.env.PORT || 5000


mongoose.connect(mongourl,/*{useNewUrlParser: true useCreateIndex:true}*/)
    .then(()=> {
        console.log('Mongodb connection done!..')
        app.listen(port,()=> console.log(`Collabo backend started on port ${port}...`))
    })
    .catch((error)=> console.log(error))


app.use('/api/v1/collabo/activity', postsRouter)
app.use('/api/v1/collabo/user',userRouter)


app.get('/api/v1/collabo',(req, res)=>{
    console.log(`...started at ${port} .....`)
    res.json({hello: `running on ${process.env.MONGO}`})
})



