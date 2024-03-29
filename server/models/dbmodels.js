const {mongoose} = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        firstname:{
            type: String,
            require: true,
            trim: true,
        },
        surname:{
            type: String,
            require: true,
            trim: true,
        },
        middlename:{
            type: String,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 8
        },
        password:{
            type: String,
            required:true,
            trim:true,
            minlength:5
        },
        projects:[{
            project:{type:mongoose.Schema.Types.ObjectId,ref:'Gig', required:true},
            role: {type: String, required: true}
        }]   
    },
    {
        timestamps: true
    }
)
const projectSchema = new Schema(
    {
        lead: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
        title: {type: String, required: true},
        description: {type: String, required: true},
        crew: {type: [String], required: true,default:"leaduser"},
        progress:[{
            progressname: {type: String, required: true},
            progressvalue:{type: Number, required: true},
            progressdescription:  {type: String, required: true},
            progressauthor:{type: String, required: true},
            progressdate: {type: Date, default: Date.now},
        }],
        media: [
            {
                media:{type: String, required:true},
                shareable: {type: Boolean, required: true, default: false}
            }
        ],
        notifications: {type: [String]},
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
const Gig = mongoose.model('Gig', projectSchema)

module.exports = {User, Gig}


/*
    db.posts.insert({})
    db.posts.insertMany([])
    db.posts.find()
    db.posts.find().pretty()
    db.posts.find({category: 'sports'})
    db.posts.find().sort({title:1/-1})
    db.posts.find({category:'jokes'}).count()
    db.posts.find().limit(5)
    db.posts.find().sort({date:-1 or 1}).limit(4)
    db.postst.update({title:'hi},
        {
            title: 'xxxxx',
            body: 'ssssssss',
            date: ''''''
        },
        {
            upsert: true
        }
    )
    db.posts.remove({title: 'xxxx'})
    db.posts.update({title: 'post two'},
        {
            $set: {
                category: 'only this updates'
            }
        }
    )
*/