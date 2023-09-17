"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require("dotenv").config();
require("./config/database").connect();
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _photoRoutes = require('./routes/photoRoutes'); var _photoRoutes2 = _interopRequireDefault(_photoRoutes);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(
      "/uploads",
      _express2.default.static(_path2.default.join(__dirname, "..", "uploads"))
    );
  }

  routes() {
    this.app.use("/users/", _userRoutes2.default);
    this.app.use("/tokens/", _tokenRoutes2.default);
    this.app.use("/photo/", _photoRoutes2.default);
  }
}

exports. default = new App().app;
