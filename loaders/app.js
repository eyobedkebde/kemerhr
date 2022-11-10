const express = require("express");
const {geh} = require("../utils/ErrorHandler")
const app = express();

const organization = require('../api/organization/router')

app.use(express.json());

app.use('v1/organization', organization)


app.use(geh)
module.exports = app;