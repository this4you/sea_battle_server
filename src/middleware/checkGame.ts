import express from 'express';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.path === "/create") {
        next()
        return;
    }

    const gameId: string | null = "gameid" in req.headers ? (req.headers.gameid as string) : null;
    if (gameId) {
        req.gameId = gameId;
        next();
    } else {
        res.status(301).json({
            code: 1,
            message: "Game not found"
        });
    }
}