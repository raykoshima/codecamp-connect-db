require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/auth-route");

const errorHandler = require("./middlewares/error");

const app = express();

app.use(express.json());

app.use("/auth", authRoute);

app.use(errorHandler);

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server Runing on port ${port}`)
})
