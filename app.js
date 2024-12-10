const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/database");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
require("dotenv/config")
/////////////////////////////////////////////////Connection in Database

db.authenticate().then(()=>{
    console.log('Connection has been established successfully.' );
});

///////////////////////////////////////////////// Middleware

function middlewareForToken(req , res , next){
    if(req.headers.reservation_token || req.originalUrl.includes('register') || req.originalUrl.includes('login')){
      
        console.log("Headers Token : " , req.headers.reservation_token);
        next();
   
    }else{  return res.status(500).send({message : "Ensure that token is Entered"})  }
}


///////////////////////////////////////////////// Routers
const clientsRouter = require("./routes/clients");
const branchesRouter = require("./routes/branches");

//////////////////////////////////////////////// Use Route
app.use(`${process.env.API_URL}/clients` ,middlewareForToken, clientsRouter)
app.use(`${process.env.API_URL}/branches` , middlewareForToken , branchesRouter)

///////////////////////////////////////////////// Listen Server
app.listen(process.env.PORT , ()=>{
    console.log(`Server is Running on Port ${process.env.PORT}`);
});