const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path')
const cookieParser = require('cookie-parser');
const app = express();
const flash = require('connect-flash');
const dbConString = "mongodb+srv://ShawanMDB:ShawanMongoDB@nodetranningcluster.oo9ru.mongodb.net/nodeAuth"
const usrAuth = require('./middleware/AuthMiddleware');
const session = require('express-session');

app.use(session({
    cookie: {maxAge:60000},
    secret:'shawan',
    resave:flash,
    saveUninitialized:false
}));
app.use(cookieParser());
app.use(flash());


//define static folder
app.use(express.static(path.join(__dirname,'public')));

//set views and view engine
app.set("view engine","ejs");
app.set("views","views");

//define urlencded
app.use(express.urlencoded({
    extended:true}));

//define route
const usrRoute = require('./routes/route');
const authRoute = require('./routes/authRoute');
// const apiRoute = require('./routes/apiRoute');

app.use(usrAuth.authjwt);

app.use(usrRoute);
app.use(authRoute);
// app.use("/api",apiRoute);

//server create and connect with DB
const port = process.env.PORT || 4002
mongoose.connect(dbConString,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(result=>{
    app.listen(port,()=>{
        console.log(`server is running http://localhost:${port}`);
        console.log("database connected");
    })
}).catch(err=>{
    console.log(err);
})
