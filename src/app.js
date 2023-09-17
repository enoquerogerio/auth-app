require("dotenv").config();
require("./config/database").connect();
import path from "path";
import express from "express";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import photoRoutes from "./routes/photoRoutes";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "..", "uploads"))
    );
  }

  routes() {
    this.app.use("/users/", userRoutes);
    this.app.use("/tokens/", tokenRoutes);
    this.app.use("/photo/", photoRoutes);
  }
}

export default new App().app;
