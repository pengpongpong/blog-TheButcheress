const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.models["TheButcheress-user"]  || mongoose.model("TheButcheress-user", UserSchema);
