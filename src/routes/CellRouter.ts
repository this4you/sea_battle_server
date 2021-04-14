import { Router } from 'express';
import CellController from "../controllers/Cell";
const controller = new CellController();
const router = Router();

router.get("/", controller.index);
router.post("/", controller.setConfig);
router.get("/enemy", controller.enemyIndex);
router.post("/shoot", controller.shoot);

export default router;