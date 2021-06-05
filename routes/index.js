const express = require("express");
const router = express.Router();

router.use("/stock", require("./stockController"));
router.use("/data", require("./dataController"));

module.exports = router;
