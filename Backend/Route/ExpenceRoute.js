const express = require("express");
const router = express.Router();

//insert  FModl
const Expences = require("../Model/ExpenceModel.js");


// Import the controller
const ExpencesController = require("../Controller/ExpenceController.js");

// Route for GET request
router.get("/", ExpencesController.getAllExpences);
// Route for POST request (inserting data)
router.post("/add", ExpencesController.addExpences);
//get by id
router.get("/:id", ExpencesController.getById);
// Update expense by ID
router.put("/:id", ExpencesController.updateExpence);
// DELETE request (deleting data by ID)
router.delete("/:id", ExpencesController.deleteExpence);

module.exports = router;