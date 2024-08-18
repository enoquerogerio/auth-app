"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
const server = _http2.default.createServer(_app2.default);

const port = process.env.APP_PORT
server.listen(port);
