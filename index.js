const express = require('express');
const mongoose = require('mongoose');
//Morgan is the one of the custome middle ware, middleware should be first of the project.
const morgan = require('morgan');
const UUID = require('uuid');
//Intiate
const app = express();
const cors = require('cors');
require('dotenv/config');



//Default Middleware
// app.use((req,res,next) => {
//    console.log('I am middleware');
//    next();
// })
//Install body-Parser for receive the post params 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//Person Router
const PersonRouter = require('./PersonsRoute')
app.use('/persons',PersonRouter);


//Person Router
const SignupRouter = require('./SignUpRoute')
app.use('/users',SignupRouter);

//Storing values in array using array
const myPersons = [
    {
     id:UUID.v4(),
     name:"Mohan",
     age:22
}, 
{
    id:UUID.v4(),
    name:"Ravi",
    age:33
},
{
    id:UUID.v4(),
    name:"Ranjith",
    age:44
}]



//GetAllPersons
app.get('/',async(req,res) => {
  //  res.send("Hi home page1"); // We can check the output in browser
   // res.json("Hi home page1") // Sends the Json Response

      // res.json(myPersons);

      //By default 200 response automatically will invoke, we can change the response code.
       res.status(200).json(myPersons);
});


//PostPersons
app.post('/',async(req,res) => {
   myPersons.push(req.body);
   res.status(200).json(req.body);      
  });

//GetPersonById
app.get('/:id',async(req,res) => {
        //res.json(req.params.id);
       //  res.status(200).json(myPersons);
         const getId = await myPersons.filter(e => e.id === req.params.id)
        res.status(200).json(getId)
  });

//About
app.get('/About',(req,res) => {
    res.send("Hi I am about") // We can check the output in browser

});

//Local host
app.listen(2000,() => {
console.log('Server started.')
});

mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.connect(process.env.CONNECTION_STRING,(err) => {
    if(err)
{ console.log('DB Not connected')}
console.log('DB Connected Successfuly');
});