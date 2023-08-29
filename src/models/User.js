import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: false, default: null },
    last_name: { type: String, required: false, default: null },
    phone: { type: Number, default: null },
    biography: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String }
})

module.exports = mongoose.model("user", userSchema);