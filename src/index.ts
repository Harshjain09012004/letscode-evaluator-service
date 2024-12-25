import express from 'express';
import serverConfig from './config/server.config';
const app = express();

app.listen(serverConfig.PORT, ()=>{
    const res : string = "You are getting watched in server!";
    console.log(`Seriver is Working on Port ${serverConfig.PORT}`);
    console.log(res);
});