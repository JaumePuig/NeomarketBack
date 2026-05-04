export function imgMiddleware(req, res, next){
    
    console.log("Vamos a guardar una imagen");
    //res.send("Vamos a guardar una imagen");
    next();
}