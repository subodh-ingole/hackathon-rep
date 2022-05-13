//jshint esversion:6
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const { stringify } = require("nodemon/lib/utils");

mongoose.connect("mongodb://localhost:27017/hackathonDB");
const userSchema = {
    firstName: String,
    password: String,
    email: String,
    gender: String,
    number: String,
    city: String,

};
const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("Login");
});

app.get("/registration",function(req,res){
    res.render("Registration");
})

app.post("/home", function (req, res) {
  res.render("home");
});

app.post("/registration", function (req, res) {

    console.log(req.body.firstName);
    console.log(req.body.LastName);

    console.log(req.body.female);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.LastName,
        password: req.body.password,
        number: req.body.phonenumber,
        city: req.body.city,
    });
    user.save();
    res.redirect("/");
}
);

let port = process.env.PORT;
if (port == null || port == "") {
  port = "3000";
}

app.listen(port, function () {
  console.log("Server has started sucessfully");
});
