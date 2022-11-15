const express = require("express");
const {geh} = require("../utils/ErrorHandler")
const app = express();

const organization = require('../api/organization/router')
const employee = require('../api/employee/employee')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/v1/organization', organization)

app.use('/v1/employee', employee)

app.use(geh)
module.exports = app;