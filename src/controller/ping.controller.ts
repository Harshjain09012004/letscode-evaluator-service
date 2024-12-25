import { Request, Response } from "express";

function pingController(_ : Request, res : Response){
    res.json("Server Ping!!!");
}

export default pingController;