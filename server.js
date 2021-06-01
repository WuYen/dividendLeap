const express = require("express");
const connectDB = require("./utility/connectDB");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config(); // get config vars

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(require("./middleware"));
app.use(require("./routes"));

if (process.env.NODE_ENV === "production") {
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

connectDB.toMongo(
  process.env.MONGODB_URI || "mongodb://localhost/mern_youtube",
  () => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, console.log(`Server is starting at ${PORT}`));
  }
);
