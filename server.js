import app from "./app";
import http from 'http';
const server = http.createServer(app)

server.listen(3000, () =>{
    console.log(`Server running on port ${3000}`);
    console.log(`CTRL + Clique on http://localhost:${3000}`);
})