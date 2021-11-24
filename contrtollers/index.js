const express = require("express");
const router = express.Router();

router.use("/api/schedule", require("./scheduleController"));
router.use("/api/my", require("./myController"));
router.use("/api/news", require("./newsController"));
router.use("/api/user", require("./userController"));
router.use("/api/tool", require("./toolController"));
router.use("/api/forcast", require("./forcastController"));

//error handling middleware
router.use(function (err, req, res, next) {
  console.error(err);
  return res.status(500).send({
    success: false,
    data: null,
    error: err.name,
    message: err.message,
  });
});

module.exports = router;
