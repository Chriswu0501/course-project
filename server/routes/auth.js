const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// post user register data
router.post("/register", async (req, res) => {
    // check the validation of data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the user exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send("Email has already been registered.");

    // register the user
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    });

    // save user data to db
    try {
        const saveUser = await newUser.save();
        res.status(200).send({
            msg: "success",
            saveObject: saveUser,
        });
    } catch (error) {
        res.status(400).send("User not saved");
    }
});

// post user login data
router.post("/login", (req, res) => {
    // check the validation of data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // find user's email from db
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send(err);
        }

        // check whether user exists
        if (!user) {
            return res.status(401).send("User not found.");
        } else {
            // if user exists, compare password in req body to password in db
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) {
                    return res.status(400).send(err);
                }
                // if password match, generate jwt with user's id and email, then send back to user
                if (isMatch) {
                    const tokenObject = { _id: user.id, email: user.email };
                    const token = jwt.sign(
                        tokenObject,
                        process.env.PASSPORT_SECRET
                    );
                    return res.send({
                        success: true,
                        token: `JWT ${token}`,
                        user,
                    });
                } else {
                    return res.status(401).send("Wrong password.");
                }
            });
        }
    });
});

module.exports = router;
