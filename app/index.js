// app/index.js

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 8080;

app.engine(".hbs", exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views/layouts")
}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));


app.use((request, response, next) => {
  request.chance = Math.random();
  next();
});

app.get("/node/hello", (request, response) => {
  response.render("home", {
    name: "John"
  });
});

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err);
  response.status(500).send("Something broke!");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});