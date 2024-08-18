"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require("dotenv").config();
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const mongoURI = process.env.MongoURI;

exports.connect = () => {
  _mongoose2.default
    .connect(
      `mongodb+srv://${dbUser}:${dbPassword}${mongoURI}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.log(error);
      process.exit(1);
    });
};
