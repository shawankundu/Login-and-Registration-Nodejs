const express = require('express');
const usrModel = require('../models/Model')

exports.signin = (req,res)=>{
    loginData = {}
    loginData.usrMail = (req.cookies.usrMail) ? req.cookies.usrMail : undefined;
    loginData.usrPass = (req.cookies.usrPass) ? req.cookies.usrPass : undefined;
        res.render("signin",{
        titel:"Login",
        message:req.flash('message'),
        data:loginData 
    })
}

//sign up
exports.signup = (req,res)=>{
        res.render("signup",{
        titel:"Signup",
        message:req.flash('message'),
    })
}

exports.usrAuth = (req, res, next)=>{
    if(req.usr){
        console.log(req.usr);
        next();
    }
    else{
        console.log(req.usr);
        res.redirect("/");
    }
}

exports.usrDashboard = (req, res) => {
    if (req.usr) {
        usrModel.find({}, (err, usrDetails)=> {
            if (!err) {
                res.render("usrDashboard", {
                    title: "User | Dashboard",
                    data: req.usr,
                    details: usrDetails
                })
            } else {
                console.log(err);
            }
        })
    }
}

exports.logout = (req, res) => {
    res.clearCookie("usrToken");
    res.redirect("/");
}