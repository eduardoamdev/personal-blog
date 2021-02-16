const express = require('express');
const router  = express.Router();
const ensureLogin = require('connect-ensure-login');

router.get('/private', ensureLogin.ensureLoggedIn('/'), (req, res) => {
  res.render('private', { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
