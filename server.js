const express = require("express");
const app = express();
app.use(express.static("./dist/01-frontend"));
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/01-frontend/" });
});
app.listen(process.env.PORT || 8080);
