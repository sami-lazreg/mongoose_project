let mongoose = require("mongoose");
const express = require('express');
const person = require("./moduls/userSchema");

let app = express();
require("dotenv").config();
let URL = process.env.URL;
port=4000

app.use(express.json())

mongoose.connect(
  URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("Database connection successful");
  }
);



// Create and Save a Record of a Model:
app.post("/", (req, res) => {                   
  let per1 = new person({                      
    name:req.body.name,                       
    age:req.body.age,                        
    favoriteFoods:req.body.favoriteFoods    
  })                                       
  per1.save()                             
  res.send(per1)                      
});


// Create Many Records with model.create()
app.post("/many", (req, res) => {
  console.log(req.body)
  person.create(req.body , (err , data) => {
    if(err) return err
    else res.send("users added")
  })
  
});


//Use model.find() to Search Your Database
app.get("/",(req,res)=>{
  person.find({} , (err , data) => {
    if(err) return err
    else res.send(data)
  })
})


//Use model.findOne() to Return a Single Matching Document from Your Database
app.get("/:favoriteFoods",(req,res)=>{
  person.findOne({favoriteFoods:{$all:`${req.params.favoriteFoods}`}},(error,data)=>{
    if(error) console.log(error)
    
    res.send(data)
  })
})



// Use model.findById() to Search Your Database By _id
app.get("/:id",(req,res)=>{
  person.findById(req.params.id,(error,data)=>{
    if(error) console.log(error)
    res.send(data)
  })
})



// Perform Classic Updates by Running Find, Edit, then Save
app.put("/:id",(req,res)=>{
  let a= person.findById(req.params.id).favoriteFoods.push("hamburger" )
  a.save()
  console.log(a)
  })


  // Perform New Updates on a Document Using model.findOneAndUpdate()
  app.put("/:name",(req,res)=>{
     let b=person.findOneAndUpdate(req.params.name,
      {age:20},{new:true})
      console.log(b)
    })



    // Delete One Document Using model.findByIdAndRemove
    app.delete("/:id",(req,res)=>{
        const deletPerson =person.findOneAndRemove(req.params.id)
        if(!deletPerson){
          return console.log('person not found')
        }
        res.send(deletPerson)
     })




    //  MongoDB and Mongoose - Delete Many Documents with model.remove()
    app.delete("/:name",(req,res)=>{
      person.remove({name:{$all:req.params.name}},(error,doc)=>{
        if(error){
          console.log(error)
        }else{
          done(null,doc)
        }
      })
   })




app.listen(port,function(){
    console.log( ' please, open your browser at http://localhost:%s', 
    port)
})
