const express = require("express");
const router = express.Router();

const employeeUtil = require("../modules/employee-util");

router.get('/', (req, res) => {
    res.render("general/home", {
        employees: employeeUtil.getAllEmployees(),
        title: "Home",
    });
});

router.get('/about', (req, res) => {
    res.render("general/about", {
        title: "About Us"
    });
});

module.exports = router;