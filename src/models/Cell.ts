import mongoose, {Schema, Document} from 'mongoose';
import {IGame} from "./Game";

export interface ICell extends Document{
    x: number,
    y: number,
    shipId: string,
    isShip: true,
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
        type: Schema.Types.Number
    },
    isShip: {
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