const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());


mongoose.connect("mongodb+srv://narayan8393:eBnOHNdpawu58u9o@cluster0.pkyompu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const userSchema = new mongoose.Schema({
    name: String, 
    weight: String,
    gender: String,
    bloodgroup: String,
    address:String,
    hla:String
  });

const user = mongoose.model('User', userSchema);

app.get("/",(req,res) => {
    res.send("Hello")
})

app.post("/register",async (req,res) => {
    const obj = req.body;
    const newUser = await user.create({
        name: obj.name, 
        weight: obj.weight,
        gender: obj.gender,
        bloodgroup: obj.bloodgroup,
        address:obj.address,
        hla:obj.hla
        
    });
    res.status(200).send(newUser);
})

app.post("/find",async (req,res) => {
    const hla = req.body.hla;
    const findUser = await user.find({hla: hla});
    if(findUser){
        res.status(200).send(findUser);
    }else{
        res.status(404).send("Not Found");
    }
})


app.listen(3000,() => {
    console.log("listening on port 3000...")
})