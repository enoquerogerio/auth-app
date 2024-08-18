import axios from "axios";

export default axios.create({
    baseURL: "https://authapi-nodejs-jwt.onrender.com"
});