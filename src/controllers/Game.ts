import express from 'express';
import {GameModel, CellModel} from "../models";
import {v4} from 'uuid';
import {IGame} from "../models/Game";
import socket from "socket.io";

const getCells = (gameId, user) => {
    const items: Array<any> = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            items.push({
                x: j,
                y: i,
                game: gameId,
                user: user
            });
        }
    }
    return items;
};

class GameController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    index = (req: express.Request, res: express.Response) => {
        GameModel.findById(req.gameId, (err, game) => {
            if (err || game === null) {
                return res.status(404).json({
                    message: 'Game not found'
                })
            }
            res.json(game);
        });
    }

    join = async (req: express.Request, res: express.Response) => {
        //добавить проверку, что еще не присоеденился другой пользователь userB === ""
        const userB: string = req.body.userB;
        const joinToken: string = req.body.joinToken;
        const game: IGame | null = await GameModel.findOne({joinToken: joinToken});
        if (game == null) {
            return res.status(200).json({
                status: "not found"
            });
        }
        game.userB = userB;
        game.status = "config";
        game.joinToken = "";
        game.currentRoundUser = userB;
        await game.save();
        await CellModel.create(getCells(game._id, userB));
        res.status(200).json({
            status: "success",
            game: game,
            user: userB
        })
        this.io.to(game._id + "").emit("SERVER:USER_JOINED", JSON.stringify(game));
    }

    create = async (req: express.Request, res: express.Response) => {
        const user: string = req.body.userName;
        const postData = {
            userA: user,
            joinToken: v4(),
            status: "home"
        };
        const game = new GameModel(postData);
        await CellModel.create(getCells(game._id, user));
        game.save()
            .then((newGame) => {
                res.json(newGame);
            })
    }
}

export default GameController;
