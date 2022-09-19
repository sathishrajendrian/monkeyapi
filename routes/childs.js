const express = require("express");
const router = express.Router();
const { addChild, getByUser } = require("../controllers/childs");

router.post("/add", addChild);
router.post("/getByUser", getByUser);

module.exports = router;
