const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err){
                // console.log(err);
                return res.status(401).json("Token is not valid!");
            }
            else{
                req.user = user;
                next();
            }
        })
    }
    else{
        return res.status(401).json("You are not Authenticated!");
    }
};

const verifyTokenAndAuthorization = (req, res ,next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(401).json("You are not allow to do this operation!");
        }
    })
}

const verifyTokenAndAdmin = (req, res ,next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(401).json("You are not allow to do this operation!");
        }
    })
}

module.exports = { verifyToken , verifyTokenAndAuthorization, verifyTokenAndAdmin}