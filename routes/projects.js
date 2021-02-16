const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

const Project = require("../models/project");

router.get("/projects", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let projects = [];
  Project.find().then((foundProjects) => {
    projects = foundProjects;
    res.render("projects", { projects });
  });
});

router.get("/newProject", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  res.render("new-project");
});

router.post("/newProject", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let projectName = req.body.name;
  let projectDescription = req.body.description;
  let projectLink = req.body.link;
  let projectImage = req.body.image;
  Project.create({
    name: projectName,
    description: projectDescription,
    link: projectLink,
  }).then((newProject) => {
    res.redirect("/projects");
  });
});

router.get("/project/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let projectId = req.params.id;
  Project.findById(projectId).then((choosenProject) => {
    let project = choosenProject;
    res.render("project", { project });
  });
});

router.get(
  "/updateProject/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let projectId = req.params.id;
    Project.findById(projectId).then((choosenProject) => {
      let project = choosenProject;
      res.render("update-project", { project });
    });
  }
);

router.post(
  "/updateProject/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let projectId = req.params.id;
    let projectName = req.body.name;
    let projectDescription = req.body.description;
    let projectLink = req.body.link;
    Project.findByIdAndUpdate(projectId, {
      name: projectName,
      description: projectDescription,
      link: projectLink
    }).then((project) => {
      res.redirect(`/project/${projectId}`);
    });
  }
);

router.get(
  "/deleteProject/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let projectId = req.params.id;
    Project.findByIdAndDelete(projectId).then((project) => {
      res.redirect('/projects');
    });
  }
);

module.exports = router;
