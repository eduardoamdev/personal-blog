const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

const Article = require("../models/article");

router.get("/articles", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let articles = [];
  Article.find().then((foundArticles) => {
    articles = foundArticles;
    res.render("articles", { articles });
  });
});

router.get("/newArticle", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  res.render("new-article");
});

router.post("/newArticle", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let articleTitle = req.body.title;
  let articleText = req.body.text;
  Article.create({
    title: articleTitle,
    text: articleText,
  }).then((newArticle) => {
    res.redirect("/articles");
  });
});

router.get("/article/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let articleId = req.params.id;
  Article.findById(articleId).then((choosenArticle) => {
    let article = choosenArticle;
    res.render("article", { article });
  });
});

router.get(
  "/updateArticle/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let articleId = req.params.id;
    Article.findById(articleId).then((choosenArticle) => {
      let article = choosenArticle;
      res.render("update-article", { article });
    });
  }
);

router.post(
  "/updateArticle/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let articleId = req.params.id;
    let articleTitle = req.body.title;
    let articleText = req.body.text;
    Article.findByIdAndUpdate(articleId, {
      title: articleTitle,
      text: articleText,
    }).then((article) => {
      res.redirect(`/article/${articleId}`);
    });
  }
);

router.get(
  "/deleteArticle/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let articleId = req.params.id;
    Article.findByIdAndDelete(articleId).then((article) => {
      res.redirect('/articles');
    });
  }
);

module.exports = router;
