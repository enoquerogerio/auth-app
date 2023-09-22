"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) =>{
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({message: "Login required"})
    }

    const [text, token] = authorization.split(" ");
    
    try {
        const decoded = _jsonwebtoken2.default.verify(token, process.env.TOKEN_KEY);
        const { id, email } = decoded

        const user = await _User2.default.findOne({ _id: id, email })
        if(!user){
            return res.status(401).json({message: "Invalid user"})
        }

        req.id = id;
        req.email = email;
        return next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token or Expired token"})
    }
};