const jwt = require('jsonwebtoken');
exports.authjwt = (req,res,next) => {
    if(req.cookies && req.cookies.userToken){
        jwt.verify(req.cookies.userToken, "shawan-30121995@#1!8293",(err,data)=>{
            req.usr = data
            next()
        })
    }
    else{
        next();
    }
}