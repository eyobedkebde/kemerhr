const express = require("express");

const app = express();

const organization = require('../api/organization/router')

app.use(express.json());

app.use('v1/organization', organization)



module.exports = app;