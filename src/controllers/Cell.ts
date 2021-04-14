import express from 'express';
import {CellModel, GameModel} from "../models";
import Cell, {ICell} from "../models/Cell";
import {IGame} from "../models/Game";

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
    enemyIndex = async (req: express.Request, res: express.Response) => {
        try {
            const cells: Array<ICell> = await CellModel.find({game: req.gameId, user: {$ne: req.userId}})
                .sort('y')
                .sort('x')
                .select(["_id", "x", "y", "isKilled", "isMissed", "isWounded"]);
            res.status(200).json({
                cells
            });
        } catch (e) {
            res.status(200).json({
                status: "not found"
            });
        }
    }


    shoot = async (req: express.Request, res: express.Response) => {
        try {
            const cellId: string = req.body.cellId;
            if (cellId) {
                const cell: ICell | null = await CellModel.findById(cellId);
                if (cell && cell.shipId) {
                    const shipCells: Array<ICell> = await CellModel.find(
                        {
                            shipId: cell.shipId,
                            _id: {$ne: cellId}
                        });
                    const woundedShipCells: Array<ICell> = shipCells.filter((cell) => {
                        return cell.isWounded;
                    });

                    if (shipCells?.length == 0 || woundedShipCells?.length == shipCells?.length) {
                        cell.isKilled = true;
                        await cell.save();
                        for (const item of woundedShipCells) {
                            item.isKilled = true;
                            await item.save();
                        }
                        res.status(200).json({
                            status: "killed",
                            shipId: cell.shipId
                        });
                    } else {
                        cell.isWounded = true;
                        await cell.save();
                        res.status(200).json({
                            status: "wounded",
                            cellId: cell._id
                        });
                    }
                } else if (cell) {
                    cell.isMissed = true;
                    await cell.save();
                    res.status(200).json({
                        status: "missed"
                    });
                }
            } else {
                res.status(200)
                    .json({
                        status: "not found",
                        message: "message not found"
                    });
            }
        } catch (e) {
            res.status(500)
                .json({
                    status: "error",
                    message: "server error"
                })
        }
    }

    setConfig = async (req: express.Request, res: express.Response) => {
        try {
            const cells: Array<ICell> = req.body.cells;
            for (const cell of cells) {
                if (cell.isShip) {
                    await CellModel.findOneAndUpdate({_id: cell._id}, {
                        isShip: cell.isShip,
                        shipId: cell.shipId,
                    });
                }
            }
            const game: IGame | null = await GameModel.findByIdAndUpdate(req.gameId, {"$push": {readyUsers: req.userId}});
            if (game && game.readyUsers.length > 0) {
                await GameModel.findByIdAndUpdate(req.gameId, {status: "game"});
            }
            res.status(200).json({
                "status": "success"
            });
        } catch (e) {
            res.status(200).json({
                "status": "error",
                "error": e
            });
        }
    }
}

export default CellController;
