const router = require('express').Router();
let HealthModel = require('../models/Health');


// get all data
 router.route('/').get((req,res)=>{
     HealthModel.find()
        .then(health => res.json(health))
        .catch(err=> res.status(400).json('Error: '+ err))
 });

 router.route('/:id').get((req,res)=>{
    HealthModel.findById(req.params.id)
    .then(health => res.json(health))
    .catch(err=> res.status(400).json('Error: '+ err))
})

//create health data
router.route('/create').post(async (req,res)=>{
    // const fullname = req.body.fullname;
    // const temperature = req.body.temperature;
    // const email = req.body.email;
    // const phone = req.body.phone;

    const user = req.body;
    // const newHealth = new Health({fullname,temperature,email,phone});
    const newHealth = new HealthModel(user);
    console.log(newHealth)
    await newHealth.save()
        .then(health => res.json('new record added'))
        .catch(err=> res.status(400).json('Error: '+ err))
});

//delete health specific id
router.route('/:id').delete(async (req,res)=>{
    await HealthModel.findByIdAndDelete(req.params.id)
    .then(health => res.json('Successfully deleted'))
    .catch(err=> res.status(400).json('Error: '+ err))
});

// update
router.route('/edit/:id').put(async (req,res)=>{
    await HealthModel.findByIdAndUpdate(req.params.id)
    .then(health => {
        const data = req.body;
        health.fullname = data.fullname;
        health.temperature = data.temperature;
        health.email = data.email;
        health.phone = data.phone;
       
        health.save()
        .then(health => res.json('Successfully updated'))
        .catch(err=> res.status(400).json('Error: '+ err))
    })
    .catch(err=> res.status(400).json('Error: '+ err))
});

module.exports = router
