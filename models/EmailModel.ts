const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const EmailSchema = new Schema({
    email: { type: String, required: true },
    active: { type: String, default: "pending", required: true },
    date: { type: Date, default: Date.now, required: true }
})

export default mongoose.models.Emails || mongoose.model("Emails", EmailSchema)