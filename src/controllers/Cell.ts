import express from 'express';
import {CellModel} from "../models";
import Cell, {ICell} from "../models/Cell";

class CellController {
    index = async (req: express.Request, res: express.Response) => {
        try {
            const cells: Array<ICell> = await CellModel.find({game: req.gameId, user: req.userId})
                .sort('y')
                .sort('x');
            res.status(200).json({
                cells
            });
        } catch (e) {
            res.status(200).json({
                status: "not found"
            });
        }
    }

    setConfig = async (req: express.Request, res: express.Response) => {

    }
}

export default CellController;
