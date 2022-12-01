const mongoose=require('./connection')

///////////////////////////////////////////////////////////////////////////////
// fruits model
///////////////////////////////////////////////////////////////////////////////

const{Schema, model} = mongoose //destructing, grabbing model and Schema off mongoose variable = mongoose.Schema or mongoose.model 

const fruitsSchema=new Schema ({
    name: String,
    color: String, 
    readyToEat: Boolean
})

const Fruit=model('Fruit', fruitsSchema)

module.exports = Fruit
