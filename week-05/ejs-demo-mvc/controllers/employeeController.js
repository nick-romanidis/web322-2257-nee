const express = require("express");
const router = express.Router();

const employeeUtil = require("../modules/employee-util");

router.get('/', (req, res) => {
    res.render("employee/list", {
        employees: employeeUtil.getAllEmployees(),
        title: "Employee List",
    });
});

router.get('/visible', (req, res) => {
    res.render("employee/list", {
        employees: employeeUtil.getVisibleEmployees(employeeUtil.getAllEmployees()),
        title: "Employee List (Visible Only)",
    });
});

module.exports = router;