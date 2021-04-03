const express = require("express");
const router = express.Router();

//Obtains json file and is parsed
const data = require("../projects.json");

//Renders 'Home' page
router.get("/", (req, res) => {
  res.render("index", { projects: data.projects });
});

//Renders 'About' page
router.get("/about", (req, res) => {
  res.render("about");
});

//Renders specific 'Projects' page onselection
router.get("/projects/:id", (req, res, next) => {
  const project = data.projects[req.params.id];

  //This conditional will lead to next render
  if (!project) {
    return next();
  }
  res.render(`project`, { project });
});

//An intentional error to force 404 error
router.get("/500", (req, res) => {
  res.render("/500");
});

module.exports = router;
