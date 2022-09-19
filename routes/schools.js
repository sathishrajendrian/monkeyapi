const express = require("express");
const router = express.Router();
const { importFromExcel, getAll } = require("../controllers/schools");

router.post("/importFromExcel", importFromExcel);
router.post("/getall", getAll);

module.exports = router;
