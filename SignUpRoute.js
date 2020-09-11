const express = require('express');
const router = express.Router();
const Persons = require('./PersonSchema');
const Signup = require('./SignUpSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
 



router.post('/login',async (req, res) => {

    try{
        var emailAlreadyExist = await Signup.findOne({Email:req.body.email});
       
      console.log(emailAlreadyExist);
        if(!emailAlreadyExist){
            return res.status(400).json("Email not exist");
        }
        console.log(emailAlreadyExist.Email);
        console.log(req.body.password);
        console.log(emailAlreadyExist.Password);
        var validPsw = await bcrypt.compare(req.body.password, emailAlreadyExist.Password);

        if(!validPsw)
         {
            return res.status(400).json("Password not valid"); 
        }
       
        var userToken = jwt.sign({Email:emailAlreadyExist.Email},'secddddretKey');
        
        console.log("Token "+userToken);
        
        res.header('auth',userToken).json(userToken);

    }
    catch(err)
    {

        res.status(400).json(err);
    }

})


const validUser = (req, res, next) => {
     var token =  req.header('auth');
     req.token = token;
     next();
}

router.get('/getAll',validUser,async(req, res) => {
    jwt.verify(req.token, 'secddddretKey', async (err,data) => {
        if(err){
            res.sendStatus(403)
        }
    })
    const data = await Signup.find().select(['-Password']);
    res.json(data);
})

//Add user
router.post('/register',async (req,res) => {

    try{
        var emailAlreadyExist = await Signup.findOne({Email:req.body.Email});
        if(emailAlreadyExist)
        {

            return res.status(400).json("Email already exist");
        }

        //Password hash

        var hash = await bcrypt.hash(req.body.password,10);
         
            const signUpPerson = await new Signup({
                Name : req.body.name,
                Email : req.body.email,
                Password : hash
            });
            const savePersons = await signUpPerson.save();
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