import express, { Router } from 'express';
import socket from "socket.io";
import {GameController} from "../controllers";


export default function (io: socket.Server) {
    const controller = new GameController(io);
    const router = Router();

    router.get("/index",controller.index);
    router.post("/create", controller.create);
    router.post("/join", controller.join);
    return router;
};