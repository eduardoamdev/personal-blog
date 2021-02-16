const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

const PersonalInfo = require("../models/personalInfo");

router.get("/personalInfo", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  res.render("personal-info");
});

router.get("/presentation", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  PersonalInfo.find({ type: "presentation" }).then((item) => {
    let presentation = item[0];
    res.render("presentation", {
      presentation,
    });
  });
});

router.get(
  "/updatePresentation/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let presentationId = req.params.id;
    PersonalInfo.findById(presentationId).then((aPresentation) => {
      let presentation = aPresentation;
      res.render("update-presentation", { presentation });
    });
  }
);

router.post(
  "/updatePresentation/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let presentationId = req.params.id;
    let presentationText = req.body.text;
    PersonalInfo.findByIdAndUpdate(presentationId, {
      text: presentationText,
    }).then((presentation) => {
      res.redirect("/presentation");
    });
  }
);

router.get("/email", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let serviceId = {};
  let templateId = {};
  let userId = {};
  PersonalInfo.find({ type: "service_id" }).then((services) => {
    serviceId = services[0];
    PersonalInfo.find({ type: "template_id" }).then((templates) => {
      templateId = templates[0];
      PersonalInfo.find({ type: "user_id" }).then((users) => {
        userId = users[0];
        res.render("email", {
          serviceId,
          templateId,
          userId
        });
      });
    });
  });
});

router.get("/updateServiceId/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let serviceId = req.params.id;
  PersonalInfo.findById(serviceId).then((aServiceId) => {
    let service = aServiceId;
    res.render("update-service-id", { service });
  });
});

router.post("/updateServiceId/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let serviceId = req.params.id;
  let serviceText = req.body.text;
  PersonalInfo.findByIdAndUpdate(serviceId, {
    text: serviceText,
  }).then((service) => {
    res.redirect("/email");
  });
});

router.get("/updateTemplateId/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let templateId = req.params.id;
  PersonalInfo.findById(templateId).then((aTemplateId) => {
    let template = aTemplateId;
    res.render("update-template-id", { template });
  });
});

router.post("/updateTemplateId/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let templateId = req.params.id;
  let templateText = req.body.text;
  PersonalInfo.findByIdAndUpdate(templateId, {
    text: templateText,
  }).then((template) => {
    res.redirect("/email");
  });
});

router.get("/updateUserId/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let userId = req.params.id;
  PersonalInfo.findById(userId).then((aUserId) => {
    let user = aUserId;
    res.render("update-user-id", { user });
  });
});

router.post("/updateUserId/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let userId = req.params.id;
  let userText = req.body.text;
  PersonalInfo.findByIdAndUpdate(userId, {
    text: userText,
  }).then((user) => {
    res.redirect("/email");
  });
});

router.get("/title", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  PersonalInfo.find({ type: "title" }).then((item) => {
    let title = item[0];
    res.render("title", {
      title,
    });
  });
});

router.get("/updateTitle/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let titleId = req.params.id;
  PersonalInfo.findById(titleId).then((aTitle) => {
    let title = aTitle;
    res.render("update-title", { title });
  });
});

router.post("/updateTitle/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let titleId = req.params.id;
  let titleText = req.body.text;
  PersonalInfo.findByIdAndUpdate(titleId, {
    text: titleText,
  }).then((title) => {
    res.redirect("/title");
  });
});

router.get("/footer", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  PersonalInfo.find({ type: "footer" }).then((item) => {
    let footer = item[0];
    res.render("footer", {
      footer,
    });
  });
});

router.get("/updateFooter/:id", ensureLogin.ensureLoggedIn("/"), (req, res) => {
  let footerId = req.params.id;
  PersonalInfo.findById(footerId).then((aFooter) => {
    let footer = aFooter;
    res.render("update-footer", { footer });
  });
});

router.post(
  "/updateFooter/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res) => {
    let footerId = req.params.id;
    let footerText = req.body.text;
    PersonalInfo.findByIdAndUpdate(footerId, {
      text: footerText,
    }).then((footer) => {
      res.redirect("/footer");
    });
  }
);

module.exports = router;
