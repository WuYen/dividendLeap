//const jwt = require("jsonwebtoken");

// function authentication(req, res, next) {
//   // Gather the jwt access token from the request header
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401); // if there isn't any token

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//     console.log(err);
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next(); // pass the execution off to whatever request the client intended
//   });
// }

// app.get("/login", (req, res) => {
//   const username = { partner: "shabeeb", property: "1344543" };
//   const accessToken = jwt.sign(username, process.env.TOKEN_SECRET);
//   res.send({ accessToken: accessToken });
// });
// app.get("/test", authentication, (req, res) => {
//   const user = req.user.username;
//   const property = req.user.property;
//   res.send(`welcom ${user} to hetelierPro, your property`);
// });

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
