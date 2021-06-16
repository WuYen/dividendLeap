const express = require("express");
const connectDB = require("./utility/connectDB");
const config = require("./utility/config");
const path = require("path");

const app = express();
app.use(require("./middleware"));
app.use(require("./routes"));

if (config.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

connectDB.toMongo(
  config.MONGODB_URI || "mongodb://localhost/mern_youtube",
  () => {
    const PORT = config.PORT || 8080;
    app.listen(PORT, console.log(`Server is starting at ${PORT}`));
  }
);
