const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// get config vars
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

function authentication(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

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

app.get("/login", (req, res) => {
  const username = { partner: "shabeeb", property: "1344543" };
  const accessToken = jwt.sign(username, process.env.TOKEN_SECRET);
  res.send({ accessToken: accessToken });
});
app.get("/test", authentication, (req, res) => {
  const user = req.user.username;
  const property = req.user.property;
  res.send(`welcom ${user} to hetelierPro, your property`);
});

// app.get("/dividendInfo/:stockNo", async (req, res) => {
//   //get oo50 dividend info
//   let data = await testGetData(req.params.stockNo);
//   res.send(data);
// });

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

//client-side code
// var p = fetch("http://localhost:8080/test", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyIjoic2hhYmVlYiIsInByb3BlcnR5IjoiMTM0NDU0MyIsImlhdCI6MTYwNjIzNTcxNn0.Tg06lwZjkdA_udWMIG1ym4XjeI3Xily7H6blYwq8xEQ`,
//   },
// });
// p.then(function (response) {
//   return response.text().then(function (text) {
//     console.log(text);
//   });
// });
