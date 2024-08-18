import mongoose from "mongoose";
import appConfig from "../config/appConfig";

const opts = { toJSON: { virtuals: true } };
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: false, default: null },
    last_name: { type: String, required: false, default: null },
    phone: { type: Number, default: null },
    biography: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    photo: {type: String, require: false, default: null}
}, opts)

userSchema.virtual('imageUrl').get(function () {
    return `${appConfig.url}/uploads/${this.photo}`;
})

module.exports = mongoose.model("user", userSchema);