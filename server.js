require('dotenv').config() // load env variables
const express=require('express') // bring in expres to make out app
const morgan=require('morgan') // nice logger for our request
const methodOverride=require('method-override') // allows us to override post request from our ejs/forms
// const mongoose=require('mongoose') // gives us that db connection and cool methods for CRUD to the datas
const PORT=process.env.PORT //check env file for anything that has this name
const app=express()
const Fruit=require('./models/fruits')
const FruitRouter=require('./controllers/fruit')

///////////////////////////////////////////////////////////////////////////////
// middlewares
///////////////////////////////////////////////////////////////////////////////

app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public')) // static allows us to send files to the front end
app.use(FruitRouter)





app.listen(PORT, ()=>{
    console.log(`listening to ${PORT}`)
})