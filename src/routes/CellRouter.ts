import express, { Router } from 'express';
import CellController from "../controllers/Cell";
const controller = new CellController();
const router = Router();

router.get("/", controller.index);

export default router;