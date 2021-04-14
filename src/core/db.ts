import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/seabattle', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => {
    console.log("DB connected");
}).catch(() => {
    console.log("DB error");
});