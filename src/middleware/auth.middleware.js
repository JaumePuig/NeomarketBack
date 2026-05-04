import { validateToken } from "../services/token.service.js";

export function authMiddleware(req, res, next){
    
    const token = req.headers.authorization;
    if(!token) res.status(401).send("Token invalido");

    const decodedToken = validateToken(token.replace('Bearer ', ''));
    if(!decodedToken) res.status(401).send("Error de token");
    next();
}
