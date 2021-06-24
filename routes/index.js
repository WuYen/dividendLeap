const express = require("express");
const router = express.Router();

router.use("/stock", require("./stockController"));
router.use("/data", require("./dataController"));
router.use("/tool", require("./toolController"));
router.use("/schedule", require("./scheduleController"));

module.exports = router;
