import express from 'express';
const availablePath = ["/create", "/join"];
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (availablePath.indexOf(req.path) !== -1) {
        next()
        return;
    }

    const gameId: string | null = "gameid" in req.headers ? (req.headers.gameid as string) : null;
    const userId: string | null = "userid" in req.headers ? (req.headers.userid as string) : null;
    if (gameId && userId) {
        req.gameId = gameId;
        req.userId = userId;
        next();
    } else {
        res.status(301).json({
            code: 1,
            message: "Game not found"
        });
    }
}