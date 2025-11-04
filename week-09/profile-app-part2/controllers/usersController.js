const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const path = require("path");

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

            // Create a unique name for the picture file, so that it can be stored
            // locally without overwriting any other files.
            const profilePicFile = req.files.profilePic;
            const uniqueName = `profile-pic-${user._id}${path.parse(profilePicFile.name).ext}`;

            // Copy the image data to a file on the file system.
            profilePicFile.mv(`public/profile-pics/${uniqueName}`)
                .then(() => {
                    // Successful
                    console.log("Uploaded the profile pic.");

                    userModel.updateOne({
                        _id: user._id
                    }, {
                        profilePic: uniqueName
                    })
                        .then(() => {
                            console.log("Updated the profile pic in the user document.");
                            res.redirect("/");

                        }).catch(err => {
                            console.log("Couldn't update the user: " + err);
                            res.redirect("/");
                        });

                })
                .catch(err => {
                    console.log("Couldn't upload the image: " + err);
                    res.redirect("/");
                })
        })
        .catch(err => {
            console.log(`Error adding user to the collection ... ${err}`);
            res.render("users/register");
        });
});

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // TODO: Validate that these are both entered.

    let errors = [];

    userModel.findOne({
        email
    })
        .then(user => {
            // Completed the search (successfully)

            if (user) {
                // Found the user document.
                bcryptjs.compare(password, user.password)
                    .then(matched => {
                        // Done comparing the passwords.

                        if (matched) {
                            req.session.user = user;

                            console.log("User signed in");
                            res.redirect("/");
                        }
                        else {
                            console.log("Password didn't match");
                            errors.push("The passwords didn't match");
                            res.render("users/login", {
                                errors
                            });
                        }
                    })
                    .catch(err => {
                        console.log("Error comparing passwords: " + err);
                        errors.push("There was a problem.");
                        res.render("users/login", {
                            errors
                        });
                    })
            }
            else {
                // User document was not found
                console.log("Document not found");
                errors.push("The passwords didn't match");
                res.render("users/login", {
                    errors
                });
            }
        })
        .catch(err => {
            // Not able to query the database
            errors.push("There was a problem.");
            console.log("Unable to query the database: " + err);
            res.render("users/login", {
                errors
            });
        });
});

router.get("/logout", (req, res) => {

    // Clear the session from the memory
    req.session.destroy();

    // DO NOT DO THIS!
    //req.session.user = null;

    res.redirect("/users/login");
})

module.exports = router;