import mongoose, {Schema, Document} from 'mongoose';
import {IGame} from "./Game";

export interface ICell extends Document{
    x: number,
    y: number,
    shipId: string,
    isShip: boolean,
    isWounded: boolean,
    isKilled: boolean,
    isMissed: boolean,
    game: IGame | string;
}

const CellSchema = new Schema({
    x: {
        type: Schema.Types.Number
    },
    y: {
        type: Schema.Types.Number
    },
    shipId: {
        type: Schema.Types.String
    },
    isShip: {
        type: Schema.Types.Boolean
    },
    isWounded: {
        type: Schema.Types.Boolean
    },
    isMissed: {
        type: Schema.Types.Boolean
    },
    isKilled: {
        type: Schema.Types.Boolean
    },
    game: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
    user: {
        require: true,
        type: Schema.Types.String
    }
}, {
    timestamps: true
})
const Cell = mongoose.model<ICell>("Cell", CellSchema);

export default Cell;