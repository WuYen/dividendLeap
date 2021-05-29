const express = require("express");
const router = express.Router();

router.use("/stock", require("./stockController"));
router.use("/v2/stock", require("./stockControllerV2"));

module.exports = router;
