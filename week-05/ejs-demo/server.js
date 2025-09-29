const express = require('express');
const path = require('path');
const employeeUtil = require('./modules/employee-util');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Set up EJS
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);

app.get('/', (req, res) => {
    res.render("home", {
        employees: employeeUtil.getAllEmployees(),
        title: "Employee List"
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About Us"
    });
});

const HTTP_PORT = process.env.PORT || 8080;


app.listen(HTTP_PORT, () => {
    console.log(`server listening on: ${HTTP_PORT}`);
});