const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

// Step 2
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

app.use(cors());
app.use(bodyParser.json()); // Data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny")); // HTTP request logger

// Step 3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const stockRoute = require("./routes/stock");
app.use("/stock", stockRoute);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
