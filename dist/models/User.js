"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

const opts = { toJSON: { virtuals: true } };
const userSchema = new _mongoose2.default.Schema({
    first_name: { type: String, required: false, default: null },
    last_name: { type: String, required: false, default: null },
    phone: { type: Number, default: null },
    biography: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    photo: {type: String, require: false, default: null}
}, opts)

userSchema.virtual('imageUrl').get(function () {
    return `${_appConfig2.default.url}/uploads/${this.photo}`;
})

module.exports = _mongoose2.default.model("user", userSchema);