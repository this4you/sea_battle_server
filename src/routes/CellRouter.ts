import { Router } from 'express';
import CellController from "../controllers/Cell";
import socket from "socket.io";


export default function (io: socket.Server) {
    const controller = new CellController(io);
    const router = Router();

    router.get("/", controller.index);
    router.post("/", controller.setConfig);
    router.get("/enemy", controller.enemyIndex);
    router.post("/shoot", controller.shoot);
    return router;
};
