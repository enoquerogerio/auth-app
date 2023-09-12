require("dotenv").config();
import mongoose from "mongoose";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

exports.connect = () => {
  mongoose
    .connect(
      `mongodb+srv://${dbUser}:${dbPassword}@authjwtapi.uqtp719.mongodb.net/authAppretryWrites=true&w=majority`,
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
