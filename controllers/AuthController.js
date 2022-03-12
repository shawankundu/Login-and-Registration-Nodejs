const usrModel = require('../models/Model');
const tokenModel = require('../models/token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    usrModel({
        usrName:req.body.usrName,
        usrPhone:req.body.usrPhone,
        usrMail:req.body.usrMail,
        usrPass:bcrypt.hashSync(req.body.usrPass, bcrypt.genSaltSync(10))
    }).save((err, usr) => {
        if(!err){
            console.log("User Added Sucessfully");
            req.flash("message", "User Added");
            res.redirect('/signup');
        }
        else{
            console.log("User Not Aded", err);
        }
    })
}

exports.signin = (req ,res, next) => {
    usrModel.findOne({
        usrMail:req.body.usrMail
    },(err,data) =>{
        if(data){
            const hashPassword = data.usrPass;
            if(bcrypt.compareSync(req.body.usrPass, hashPassword)){
                const token = jwt.sign({
                    id:data._id,
                    usrName:data.usrName,
                    usrMail:data.usrMail,
                    usrPhone:data.usrPhone
                },"shawan-30121995@#1!8293",{expiresIn:'10m'});
                res.cookie('userToken', token);
                if(req.body.rememberme){
                    res.cookie('usrMail', req.body.usrMail)
                    res.cookie('usrPass', req.body.usrPass)
                }
                console.log(data);
                res.redirect('usrDashboard')
            }else{
                req.flash("message", "Invalid Password");
                res.redirect('/');
            }
        
        }else{
            req.flash("message", "Invalid Email");
            res.redirect('/');
        }
    })
}