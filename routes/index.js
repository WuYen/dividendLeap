const express = require("express");
const router = express.Router();

router.use("/stock", require("./stock"));

module.exports = router;
