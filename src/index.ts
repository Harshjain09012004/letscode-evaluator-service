const express = require('express');
const app = express();
const { PORT } = require('./config/server.config');

// app.get('/', (_,res)=>{
//     res.json({message : "Request Received!"});
// })

app.listen(PORT, ()=>{
    let res : String = "You are getting watched in server!";
    console.log(`Seriver is Working on Port ${PORT}`);
    console.log(res);
})