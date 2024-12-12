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

async function middlewareForToken(req , res , next){
    if(req.headers.reservation_token || req.originalUrl.includes('register') || req.originalUrl.includes('login')){
        console.log("Headers Token : " , req.headers.reservation_token);
        next();
    }
    else{
          return res.status(500).send( { message : "Ensure that token is Entered" } ) 
        }
}

///////////////////////////////////////////////// Routers
const clientsRouter = require("./routes/clients");
const branchesRouter = require("./routes/branches");
const categoriesRouter = require("./routes/categories");
const servicesRouter = require("./routes/services");
const employeesRouter = require("./routes/employees");
const paymentRouter = require("./routes/payment");

//////////////////////////////////////////////// Use Route
app.use(`${process.env.API_URL}/clients` ,middlewareForToken, clientsRouter)
app.use(`${process.env.API_URL}/branches` , middlewareForToken , branchesRouter)
app.use(`${process.env.API_URL}/categories` , middlewareForToken , categoriesRouter)
app.use(`${process.env.API_URL}/services` , middlewareForToken , servicesRouter)
app.use(`${process.env.API_URL}/employees` , middlewareForToken , employeesRouter)
app.use(`${process.env.API_URL}/payment` , middlewareForToken , paymentRouter);

///////////////////////////////////////////////// Listen Server
app.listen(process.env.PORT , ()=>{
    console.log(`Server is Running on Port ${process.env.PORT}`);
});