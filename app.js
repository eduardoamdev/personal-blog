require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const User = require("./models/user");
const cors = require("cors");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

// Middleware Setup

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true,
  })
);
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});
app.use(flash());
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, next) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(null, false, { message: "Nombre de usuario incorrecto" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return next(null, false, { message: "Contraseña errónea" });
        }

        return next(null, user);
      });
    }
  )
);
app.use(passport.initialize());
app.use(passport.session());

// Express View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// Routes middleware goes here

const home = require("./routes/home");
app.use("/", home);
const private = require("./routes/private");
app.use("/", private);
const articles = require("./routes/articles");
app.use("/", articles);
const tutorials = require("./routes/tutorials");
app.use("/", tutorials);
const projects = require("./routes/projects");
app.use("/", projects);
const personal = require("./routes/personal");
app.use("/", personal);
const api = require("./routes/api");
app.use("/api", api);

module.exports = app;
