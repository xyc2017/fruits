const express=require('express') // bring this in so we can make our router
const Fruit=require('../models/fruits')

////////
//create router variable to attach routes

const router=express.Router()  // router will have all routes attached to it

/////////////////// actual routes below
router.get('/', (req, res)=>{
    res.send('server is doing what it should be doing')
})

router.get('/fruits/seed', (req, res)=>{
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
            res.json(createFruits)
            
        })
      })
})

router.get('/fruits', (req, res)=>{
    // get all the fruits from mongo and send them back
    Fruit.find({})
    .then((fruits)=>{
        // res.json(fruits)
        res.render('fruits/index.ejs', { fruits })
    })
})


router.get('/fruits/new', (req, res)=>{
    res.render('fruits/new.ejs')
})


router.post('/fruits', (req, res)=>{
    req.body.readyToEat= req.body.readyToEat === 'on' ? true : false
    Fruit.create(req.body, (err, createdFruit)=>{
       
        res.redirect('/fruits')
    })
})

router.get('/fruits/:id/edit', (req, res)=>{
    const id=req.params.id
    //find fruit and send it to encodeURIComponent.ejs to prepopulate the form
    Fruit.findById(id, (err, foundFruit)=>{
       // res.json(foundFruit)
       res.render('fruits/edit.ejs',{fruit: foundFruit}) // path to change foundFruit to fruit
    })
})

router.put('/fruits/:id', (req, res)=>{
    req.body.readyToEat= req.body.readyToEat === 'on' ? true : false
    Fruit.findByIdAndUpdate(req.params.id,req.body,{new:true}, (err, updatedFruit)=>{
        res.redirect(`/fruits/${req.params.id}`)

    }) // find the id of the fruit we want to update, data in the form when hit submit, gives the newest version of the fruit
})
router.get('/fruits/:id', (req, res)=>{
    // go and get fruit from the database
   
    Fruit.findById(req.params.id)
    .then((fruit)=>{
        res.render('fruits/show.ejs',{fruit})
    })
})

router.delete('/fruits/:id', (req, res)=>{
    //method 1
    Fruit.findByIdAndDelete(req.params.id,(err, deletedFruit)=>{
        console.log(err, deletedFruit)
        res.redirect('/fruits')
    })
    // method 2
//  Fruit.findByIdAndDelete(req.params.id
    //   .then ((err, deletedFruit)=>{
    //   console.log(err, deletedFruit)
    //   res.redirect('/fruits')
        
//   }))
//     .catch(err =>console.log(err))
})

/////////////////////export this router to use in other files
module.exports=router