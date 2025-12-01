const express = require("express");
const { getClima } = require("../controllers/weatherController");
const router = express.Router();

router.get("/:ciudad", getClima);

module.exports = router;
