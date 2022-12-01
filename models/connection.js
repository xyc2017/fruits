require('dotenv').config() // load env variables
const mongoose=require('mongoose') // gives us that db connection and cool methods for CRUD to the datas

///////////////////////////////////////////////////////////////////////////////
// Database connection
const DATABASE_URL= process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

// establish our connections
mongoose.connect(DATABASE_URL, CONFIG)

// log connections events from mongoose
mongoose.connection
.on('open', ()=> console.log("Mongoose connected"))
.on('close', ()=> console.log("Mongoose disconnected"))
.on('error', (error)=> console.log("Mongoose error", error))

module.exports = mongoose