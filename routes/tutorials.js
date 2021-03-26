const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

const Tutorial = require("../models/tutorial");

router.get("/tutorials", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let tutorials = [];
  Tutorial.find().then((foundTutorials) => {
    tutorials = foundTutorials;
    res.render("tutorials", { tutorials });
  });
});

router.get("/newTutorial", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  res.render("new-tutorial");
});

router.post("/newTutorial", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let tutorialName = req.body.name;
  let tutorialLink = req.body.link;
  Tutorial.create({
    name: tutorialName,
    link: tutorialLink
  }).then((newLink) => {
    res.redirect("/tutorials");
  });
});

router.get("/tutorial/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let tutorialId = req.params.id;
  Tutorial.findById(tutorialId).then((choosenTutorial) => {
    let tutorial = choosenTutorial;
    res.render("tutorial", { tutorial });
  });
});

router.get(
  "/updateTutorial/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let tutorialId = req.params.id;
    Tutorial.findById(tutorialId).then((choosenTutorial) => {
      let tutorial = choosenTutorial;
      res.render("update-tutorial", { tutorial });
    });
  }
);

router.post(
  "/updateTutorial/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let tutorialId = req.params.id;
    let tutorialName = req.body.name;
    let tutorialLink = req.body.link;
    Tutorial.findByIdAndUpdate(tutorialId, {
      name: tutorialName,
      link: tutorialLink
    }).then((tutorial) => {
      res.redirect(`/tutorial/${tutorialId}`);
    });
  }
);

router.get(
  "/deleteTutorial/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let tutorialId = req.params.id;
    Tutorial.findByIdAndDelete(tutorialId).then((tutorial) => {
      res.redirect('/tutorials');
    });
  }
);

module.exports = router;
