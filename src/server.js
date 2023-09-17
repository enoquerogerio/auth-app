import app from "./app";
import http from "http";
const server = http.createServer(app);

const port = process.env.APP_PORT
server.listen(port);
