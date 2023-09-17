"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

class TokenController {
  async store(req, res){
    const {email = '', password = ''} = req.body;

    //check if user send email or password
    if(!email || !password){
      return res.status(401).json({message: "Invalid credentials"})
    }

    //check if  email exists
    const user = await _User2.default.findOne({email});
    if(!user){
      return res.status(400).json({message: "User not found"}) 
    }

    //check password
    const passwordUser = await _bcrypt2.default.compare(password, user.password)
    if(!passwordUser){
      return res.status(401).json({message: "Wrong password!"})
    }

    //create token for user
    const  id  = user._id
    const token = _jsonwebtoken2.default.sign({id, email}, process.env.TOKEN_KEY, {
      expiresIn: process.env.TOKEN_EXPIRATION
    });

    res.json({ token });
  }
}

exports. default = new TokenController();

/*
index -> list all users -> GET
store/create -> create new users -> POST
delete -> delete user -> DELETE
show -> show user -> GET
update -> update user -> PATCH or PUT
*/
