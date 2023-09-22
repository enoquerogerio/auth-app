"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _login = require('../middlewares/login'); var _login2 = _interopRequireDefault(_login);
var _PhotoController = require('../controllers/PhotoController'); var _PhotoController2 = _interopRequireDefault(_PhotoController);



const router  = new (0, _express.Router)();
router.post('/', _login2.default, _PhotoController2.default.store);

exports. default = router