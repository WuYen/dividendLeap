const express = require("express");
const router = express.Router();

router.use("/schedule", require("./scheduleController"));
router.use("/mystock", require("./myStockController"));
router.use("/news", require("./newsController"));
router.use("/user", require("./userController"));
router.use("/tool", require("./toolController"));

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
