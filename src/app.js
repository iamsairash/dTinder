const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send({firstName: "Sairash", lastName: "Chaudhary"})
})

app.post("/user",(req,res)=>{
    //posted user data
    res.send("user data saved in database successfully.")
})

app.patch("/user",(req,res)=>{
    //data updated
    res.send("user date updated.")
})

app.delete("/user",(req,res)=>{
    res.send("user data deleted.")
})

app.listen(3000, () => {
  console.log("The server is running in port 3000...");
});
