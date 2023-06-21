const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuerySchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

export const UserModel = mongoose.model("TheButcheress-user", QuerySchema)

