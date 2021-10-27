const express = require("express");
const router = express.Router();

router.use("/stock", require("./stockController"));
router.use("/data", require("./dataController"));
router.use("/tool", require("./toolController"));
router.use("/schedule", require("./scheduleController"));
router.use("/user", require("./userController"));
router.use("/news", require("./newsController"));
router.use("/mystock", require("./myStockController"));

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
