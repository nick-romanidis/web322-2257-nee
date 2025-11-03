const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

// Route to registration page.
router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // TODO: Validate the information entered is correct.

    // TODO: On the assignment, first check if the email already exists in a document.
    // WARNING: Do not throw/show any error if a duplicate email exists and an attempt to
    //          add is made. Rather, show a friendly error message.


    const newUser = new userModel({
        firstName, lastName, email, password
    });

    newUser.save()
        .then(user => {
            console.log(`User ${user.firstName} has been added to the collection`);
            res.redirect("/");
        })
        .catch(err => {
            console.log(`Error adding user to the collection ... ${err}`);
            res.render("users/register");
        });
});

module.exports = router;