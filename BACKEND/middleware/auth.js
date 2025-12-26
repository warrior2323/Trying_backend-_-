 const jwt=require('jsonwebtoken')

 const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token= authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(500).send('"You have not logged in"')
    
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err,user) => {
      if(err) return res.status(500).send('"pehle hi fursat mein nikal"')
      req.user=user
      next()
    })    
}

const isAdmin=(req,res,next) =>{
    if(req.user.username==='KHEERA' && req.user.role==='admin'){
        next()
    }else{
        res.status(500).send('"Access Denied"')
    }
}

module.exports={authenticateToken,isAdmin}