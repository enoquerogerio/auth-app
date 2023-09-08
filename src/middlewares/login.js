import  jwt  from "jsonwebtoken";

export default (req, res, next) =>{
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({message: "Login required"})
    }

    const [text, token] = authorization.split(" ");
    
    try {
        
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        //const {id, email} = decoded
        console.log(decoded)
        return next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: "Invalid token"})
    }
};