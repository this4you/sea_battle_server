import express, { Router } from 'express';
import {GameController} from "../controllers";
const controller = new GameController();
const router = Router();

router.get("/",controller.index);
router.post("/create", controller.create);
router.post("/join", controller.join);


export default router;