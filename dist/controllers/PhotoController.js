"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single("photo");

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      const user = await _User2.default.findById(req.id, { password: 0 });

      if (!user) {
        return res.status(422).json({
          message: "User not found",
        });
      }
      if (error) {
        return res.status(401).json({ message: error.code });
      }
      
      const newUser = await _User2.default.updateOne(
        { _id: req.id },
        { photo: req.file.filename }
      );
      return res.json(newUser);
    });
  }
}

exports. default = new PhotoController();
