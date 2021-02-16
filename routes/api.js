const express = require("express");
const router = express.Router();

const Article = require("../models/article");
const Project = require("../models/project");
const Tutorial = require("../models/tutorial");
const PersonalInfo = require("../models/personalInfo");


router.get(("/personal"), (req, res) => {
  PersonalInfo.find().then((info) => {
    res.send(info);
  })
});

router.get("/articles", (req, res) => {
  Article.find().then((articles) => {
    res.send(articles);
  });
});

router.get("/article/:articleId", (req, res) => {
  let id = req.params.articleId;
  Article.findById(id).then((article) => {
    res.send(article);
  });
});

router.get("/projects", (req, res) => {
  Project.find().then((projects) => {
    res.send(projects);
  });
});

router.get("/project/:projectId", (req, res) => {
  let id = req.params.projectId;
  Project.findById(id).then((project) => {
    res.send(project);
  });
});

router.get("/tutorials", (req, res) => {
  Tutorial.find().then((tutorials) => {
    res.send(tutorials);
  });
});


module.exports = router;
