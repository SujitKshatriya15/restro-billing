import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

export default function requireAuth(req,res,next){
    const authHeader= req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Not Authenticated"})
    }
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

