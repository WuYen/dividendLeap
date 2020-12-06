const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 8080;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mern_youtube",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(require("./middleware"));
app.use(require("./routes"));

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
