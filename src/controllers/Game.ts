import express from 'express';
import {GameModel} from "../models";
import {v4} from 'uuid';

class GameController {
    index = (req: express.Request, res:express.Response) => {
        GameModel.findById(req.gameId, (err, game) => {
            if(err || game === null) {
                return res.status(404).json({
                    message: 'Game not found'
                })
            }
            res.json(game);
        });
    }

    create = (req:express.Request, res:express.Response) => {
        const postData = {
            userA: req.body.userName,
            joinToken: v4()
        };

        const game = new GameModel(postData);
        game
            .save()
            .then((newGame) => {
                res.json(newGame);
            })
    }
}

export default GameController;
