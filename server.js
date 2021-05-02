const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const parser = require("body-parser");
const cors = require("cors");
const xhr2 = require("xhr2")


const port = 8080 || process.env.PORT


// Endpoints
const district = require("./router/district");
const taluk = require("./router/taluk");
const election = require("./router/election");


app.use(cors())

global.XMLHttpRequest = xhr2;

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database connected"));

app.use(parser.urlencoded({ extended: false }))
app.use(express.json());


app.use("/api/v1/", district);
app.use("/api/v1/", taluk);
app.use("/api/v1/", election);


app.listen(port, () => console.log("Server is up and running"));