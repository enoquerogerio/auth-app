"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

class UserController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      //Validate input
      if (!(email && password)) {
        res.status(400).json({message: "All input is required"});
        return;
      }

      //Check if user already exist
      const oldUser = await _User2.default.findOne({ email });

      if (oldUser) {
        res.status(409).json({message: "Email already exist. Please Login"});
        return;
      }

      //encrypt user password
      const encryptedPassword = await _bcrypt2.default.hash(password, 8);

      //create user in database
      const user = await _User2.default.create({
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({message: "Something went wrong"})
    }
  }
  async index(req, res) {
    try {
      //sort in ascending order byu first_name and do not include password
      const user = await _User2.default.find({}, {password: 0});
      return res.json(user);
    } catch (error) {
      return res.status(500).json({message: "Something went wrong"})
    }
  }
  async show(req, res) {
    try {
      if(!req.params.id){
        return res.status(400).json({message: "Missing user id"})
      }

      const user = await _User2.default.findById(req.params.id, { password: 0 });
      return res.json(user);
    } catch (error) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await _User2.default.findById(req.id, { password: 0 });

      if (!user) {
        return res.status(422).json({
          message: "User not found",
        });
      }

      //check if the email already exists
      if (req.body.email) {
        const { email } = req.body;
        if (await _User2.default.findOne({email})) {
          return res.status(400).json({
            message: "Email already exits",
          });
        }
      }

      if (req.body.password) {
        req.body.password = await _bcrypt2.default.hash(req.body.password, 8);
      }

      const newUser = await _User2.default.updateOne({ _id: req.id }, req.body);
      return res.json(newUser);
    } catch (error) {
      return res.status(500).json({message: "Something went wrong"})
    }
  }

  async delete(req, res)  {
    try {
      const user = await _User2.default.findById(req.id);

      if (!user) {
        return res.status(422).json({
          message: "User not found",
        });
      }

      await _User2.default.deleteOne({ _id: req.id });
      res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
      return res.status(500).json({message: "Something went wrong"})
    }
  }
}

exports. default = new UserController();

/*
index -> list all users -> GET
store/create -> create new users -> POST
delete -> delete user -> DELETE
show -> show user -> GET
update -> update user -> PATCH or PUT
*/
