const express = require('express');
const router = express.Router();
const Persons = require('./PersonSchema');
const bcrypt = require('bcryptjs');
 


//Add person
router.post('/',async (req,res) => {

    try{
        const postPerson = await new Persons({
            Name : req.body.Name,
            Email : req.body.Email,
            Age : req.body.Age
        });
        const savePersons = await postPerson.save();
        res.status(200).json(savePersons);
           
                
      }
      catch(err)
      {
          res.status(400).json({"err":err});
      }

    
});

//Get persons
router.get('/',async (req,res) => {

    try{
        const getAll = await Persons.find();
        res.status(200).json(getAll);
      }
      catch(err)
      {
          res.status(400).json({"err":err});
      }

    
});

//Get person by id
router.get('/:id',async (req,res) => {

    try{
        const getById = await Persons.findById(req.params.id)
        res.status(200).json(getById);
      }
      catch(err)
      {
          res.status(400).json({"err":err});
      }

    
});

//Update person by id
router.put('/update',async (req,res) => {

    try{
        const updatePerson = await Persons.updateOne({_id:req.body._id},
            {$set:{Name : req.body.Name,Age : req.body.Age,Email : req.body.Email}});
        
        const getById = await Persons.findById(req.params.id)
        res.status(200).json(getById);
      }
      catch(err)
      {
          res.status(400).json({"err":err});
      }

    
});

//Delete person by id
router.delete('/delete/:id',async (req,res) => {

    try{
        const deletePerson = await Persons.remove({_id:req.params.id})
        
       // const getById = await Persons.findById(req.params.id)
        res.status(200).json(deletePerson);
        

      }
      catch(err)
      {
          res.status(400).json({"err":err});
      }

    
});
module.exports = router;