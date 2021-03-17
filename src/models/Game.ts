import mongoose, {Schema, Document} from 'mongoose';

export interface IGame extends Document{
    userA: string,
    userB: string,
    status: string,
    joinToken: string
}

const GameSchema = new Schema({
    userA: {
        type: Schema.Types.String
    },
    userB: {
        type: Schema.Types.String
    },
    status: {
        type: Schema.Types.String
    },
    joinToken: {
        type: Schema.Types.String
    }
}, {
    timestamps: true
})
const Game = mongoose.model<IGame>("Game", GameSchema);
export default Game;