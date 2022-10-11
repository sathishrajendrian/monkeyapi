const { v4: uuid4 } = require("uuid");
const { successMsg, failureMsg, printError } = require("../utils");

const School = require("../models/school");
const importFromExcel = async (req, res) => {
  var XLSX = require("xlsx");

  var workbook = XLSX.readFile("./schools.xlsx");

  var sheet_name_list = workbook.SheetNames;
  var excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  for (const s of excelData) {
    const name = s["SCHOOL NAME"];
    try {
      const newSchool = new School({
        id: uuid4(),
        schoolId: uuid4(),
        schoolName: name,
        address: "",
      });
      await newSchool.save().catch((e) => console.log(e));
    } catch (error) {
      printError(error);
    }
  }
  successMsg(res, "Uploaded Successfully");
};
const getAll = async (req, res) => {
  try {
    const schools = await School.find();
    successMsg(res, schools);
  } catch (error) {
    printError(error);
    failureMsg(res, "Something went wrong");
  }
};
module.exports = {
  importFromExcel,
  getAll,
};
