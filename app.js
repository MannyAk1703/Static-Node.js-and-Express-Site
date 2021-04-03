//Initiating express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static("public"));
app.set("view engine", "pug");

const mainRoutes = require("./routes");

app.use(mainRoutes);

// Handle page not found errors
app.use((req, res) => {
  const err = new Error();
  err.status = 404;
  err.message =
    "Seems like this page has moved or doesn't exist (anymore/yet)...";

  console.log(err);
  res.status(404);
  res.render("not_found", { err });
});

// Handle remaining errors
app.use((err, req, res, next) => {
  console.log(err);
  err.status = 500;
  res.status(err.status || 500);
  res.render("error", {
    status: err.status || 500,
    message:
      "Something went wrong on our side. Please let us know or try again later!",
  });
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
