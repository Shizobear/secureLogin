const express = require("express");
const router = express.Router();
const functions = require("../functions.js");
const user = require("../models/user");
const bodyParser = require('body-parser');
let path = require('path');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


router.post("/login", function (req, res) {

    let data = req.body;
    let password = data.password;
    let email = data.email;
    console.log(data);

    user.find({ "email": email })
        .countDocuments(function (err, number) {
            if (number == 0) {
                res.json("E-Mail not found!");
                console.log("E-Mail not found!");
            } else {

                user.findOne({ "email": email }).lean().exec(function (err, doc) {
                    
                    let docString = JSON.stringify(doc);
                    let docJSON = JSON.parse(docString);
                    let salt = docJSON.salt;
                    let hashedPassword = functions.checkHashPassword(password, salt).passwordHash;
                    let encryptedPassword = docJSON.password;

                    if(hashedPassword == encryptedPassword) {
                        res.render('index.ejs');
                        console.log("Login successful!");
                    } else {
                        res.json("Wrong Password!");
                        console.log("Wrong Password!");    
                    }
                });

            }

        });

});

module.exports = router;