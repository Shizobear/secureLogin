const express = require("express");
const router = express.Router();
const functions = require("../functions.js");
const mongoose = require("mongoose");
const user = require("../models/user");

router.post("/registration", function(req, res) {

    let data = req.body;
    let passwordPlain = data.password;
    let hashData = functions.saltHashPassword(passwordPlain);
    let password = hashData.passwordHash;
    let salt = hashData.salt;
    let name = data.name;
    let email = data.email;

    let userDataJSON = new user ({
        "email" : email,
        "name": name,
        "password": password,
        "salt": salt
    });

    user.find({email: userDataJSON.email})
    .countDocuments(function(err, number){
        if(number != 0) {
            res.json("E-Mailalready in use!");
            console.log("E-Mailalready in use!");
        } else {
            
            userDataJSON.save(function (err) {
                if (err) throw err;
                console.log('User created!');
        
                res.status(201).json({
                    message: 'User created!',
                    user: user
                });

            });

        }

    });

});

router.get("/registration", function (req, res) {

    user.find({})
    .then(function (doc) {
        console.log(doc);
        res.status(200).json(doc);
    });

});

module.exports = router;