import jwt from 'jsonwebtoken'

export default async function verifyToken(req,res,next){
  if(req.cookies.token) {
    req.token = req.cookies.token;
    jwt.verify(req.token, 'default', (err, authorizedData) => {
        if(err){
          return res.status(401).send("No Token")
        } else { 
          res.locals.tojwt=authorizedData.toJWT
          next()  
        }
    })
  } else {
    return res.status(401).json("No Token");x
  }
}
export {verifyToken}