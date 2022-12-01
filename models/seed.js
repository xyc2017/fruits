require('dotenv').config()
const mongoose=require('./connection')
const Fruit=require('./fruits')

mongoose.connection.on('open', ()=>{
     //define data we want to put in the database
     const startingFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ]
      // delete all fruits
      Fruit.deleteMany({}, (err, data)=>{
        // seed starter fruits
        // create new fruits once old fruits deleted
        Fruit.create(startingFruits, (err, createFruits)=>{
            console.log(createFruits)
            
        })
      })
})