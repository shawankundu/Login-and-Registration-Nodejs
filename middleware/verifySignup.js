const usrModel = require('../models/Model');

exports.checkDuplicateEntries = (req, res, next) => {
    usrModel.findOne({
        usrName: req.body.usrName
    }).exec((err, usr) =>{
        if(err){
            console.log(err);
            return;
        }
        if(usr){
            req.flash("message", "Username Already Exists");
            return res.redirect('/');
        }
        usrModel.findOne({
            usrMail: req.body.usrMail,
        }).exec((err, mail) => {
            if(err){
                console.log(err);
                return;
            }
            if(mail){
                req.flash("message", "Email Already Exists");
                return res.redirect('/');
            }
            const password = req.body.usrPass;
            const cnfpass = req.body.usrCnfpass;
            if(password !== cnfpass){
                req.flash("message", "Password are not Matched");
                return res.redirect('/');
            }
            next();
        })
    })
}