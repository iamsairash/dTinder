const adminAuth = (req,res,next)=>{
    const token = "abc"
    const isAuthorized = token ==="abc"
    if (isAuthorized){
        next()
    }
    else{
        res.status(401).send("Unauthorized access")
    }
}

const userAuth = (req,res,next)=>{
    const token = "abc"
    const isAuthorized = token ==="abc"
    if (isAuthorized){
        next()
    }
    else{
        res.status(401).send("Unauthorized access")
    }
}

const errorHandling = (err,req,res,next)=>{
    if (err){
        res.send("Something went wrong")
    }
}

module.exports = {
    adminAuth,
    userAuth,
    errorHandling
}