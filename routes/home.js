const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");


router.get("/", (req, res, next) => {
  res.render("login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));


module.exports = router;
