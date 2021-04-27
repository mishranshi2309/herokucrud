const express =  require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
//const bodyparser = require("body-parser");
const Student = require("./models/students");
const app =  express();


//db connection
//db name: students 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/students')
mongoose.connection.on('connected',()=>{
    console.log("database connected");
})
mongoose.connection.on('error', ()=>{
    console.log("error");
})
//middlewares
app.use(cors());
app.use(express.json())
//routes

app.get('/', (req,res)=>{
    Student.find()
    .exec()
    .then(result=>{
        res.send(result);
    })
})
app.post('/students', (req,res)=>{
   // res.send("hiiss");
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);
    const student = new Student({
        _id : new mongoose.Types.ObjectId,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        place:req.body.place
    });
    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"succesfully submitted"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured"});
    })
    //res.send('ok');

})

app.get('/student/:id',(req,res)=>{
    const id = req.params.id;
    Student.remove({_id:id} , (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.status(200).json({msg:"deleted succesfully"});
        }
    })
})

app.put('/student/:id',(req,res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const place = req.body.place;
    const id=req.params.id;
    Student.update({_id:id},{$set:{firstname: firstname,lastname:lastname, place: place}})
    .then(result=>{
        res.json({msg:"updated successfully"});
    }).catch(err=>{
        res.status(500).json({msg:"error"});
    })
})
//server
app.listen(process.env.PORT || 5001);