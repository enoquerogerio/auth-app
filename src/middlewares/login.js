import  jwt  from "jsonwebtoken";
import User from "../models/User"

export default async (req, res, next) =>{
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({message: "Login required"})
    }

    const [text, token] = authorization.split(" ");
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const { id, email } = decoded

        const user = await User.findOne({ _id: id, email })
        if(!user){
            return res.status(401).json({message: "Invalid user"})
        }

        req.id = id;
        req.email = email;
        return next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token or Expired token"})
    }
};