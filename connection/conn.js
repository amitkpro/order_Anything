const mongoose = require("mongoose");
//const express = require('express');
const DB = 'mongodb://localhost:27017/codesandbotD';
mongoose.connect("mongodb://localhost:27017/myapp",{
    useNewUrlParser:true,
    useUnifiedTopology:true
  //  useCreateIndex:true
}).then(() => {
    console.log(`connection successfull`);
}).catch((e) => {
    console.log(`connection unsuccessfull`);
});
/*
mongoose.connect('mongodb://localhost:27017/myapp').then(()=>{
  console.log("successfull");
}).catch((e)=>{
  console.log("unsuccessfull");
});
//require('dotenv').config();
const DB = 'mongodb://localhost:27017/codesandbotD';
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log(`connection successfull`);
}).catch((e) => {
    console.log(`connection unsuccessfull`);
})
/*
//const DB = process.env.DB

mongoose.connect(DB ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log(`connection successfull`);
}).catch((e) => {
    console.log(`connection unsuccessfull`);
})
*/
