const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require ('dotenv').config()

const app = express()
const mongourl = process.env.MONGO 

const postsRouter = require('./routes/posts')

app.use(cors())
app.use(express.json())

mongoose.connect(mongourl,{useNewUrlParser: true /*useCreateIndex:true*/})
    .then(()=> console.log('Mongodb connection done!..'))
    .catch((error)=> console.log(error))

app.use('/api/v1/collabo', postsRouter)


app.get('/',(req, res)=>{
    res.json({hello: `running on ${process.env.MONGO}`})
})

const port = process.env.PORT || 5000
app.listen(port,()=> console.log(`Collabo backend started on port ${port}...`))
