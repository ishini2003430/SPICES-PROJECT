const mongoose = require("mongoose");
const Expences = require("../Model/ExpenceModel");

//Display data
const getAllExpences = async (req, res , next )=>{
    let expences;

    //get all expences
    try{
        expences = await Expences.find(); 


    }catch(err){
        console.log(err);
    }
    //not found
    if(!expences || expences.length === 0){
        return res.status(404).json({message:"Expence not Found"});
    }
     //Display All Expences Function
     return res.status(200).json({expences});
    };

    //Insert data
    const addExpences = async (req, res , next )=>{
        const{title, amount, category, date, description} =req.body;

    // Validate required fields
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate amount (must be positive)
  if (amount < 0) {
    return res.status(400).json({ message: "Amount cannot be negative" });
  }
  
    // Validate title and category (No special characters like '@', '&', '%', '#')
  const validText = /^[a-zA-Z0-9\s]+$/;
  if (!validText.test(title) || !validText.test(category)) {
    return res.status(400).json({ message: "Title and Category cannot contain special characters like '@', '&', '%', '#'" });
  }


        let expences;

        try{
            expences = new Expences({ title, amount, category, date, description });
            await expences.save();
        }catch(err){
            console.log(err);
        }

        // expences not inserting
        if(!expences){
            return res.status(404).json({message: "unable to add expences"});
        }
        return res.status(200).json({ expences});
    };


    //get by id
    const getById = async (req, res, next) =>{
        const id = req.params.id;

        let expence;

        try{
            expence = await Expences.findById(id);
        }catch (err) {
            console.log( err);

    }
    //expence not available
    if (!expence) {
        return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ expence });
    };

    //update function
    const updateExpence = async (req, res, next) => {
        const id = req.params.id;
        const { title, amount, category, date, description } = req.body;

      // Validate required fields
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate amount (must be positive)
  if (amount < 0) {
    return res.status(400).json({ message: "Amount cannot be negative" });
  }
  
  // Validate title and category (No special characters like '@', '&', '%', '#')
  const validText = /^[a-zA-Z0-9\s]+$/;
  if (!validText.test(title) || !validText.test(category)) {
    return res.status(400).json({ message: "Title and Category cannot contain special characters like '@', '&', '%', '#'" });
  }
    
        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
    
        let expence;
    
        try {
            // Find the expense by ID and update it
            expence = await Expences.findByIdAndUpdate(
                id,
                { title, amount, category, date, description },
                { new: true } // Return the updated document
            );
        } catch (err) {
            console.log("Error updating expense:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    
        // Expense not found
        if (!expence) {
            return res.status(404).json({ message: "Expense not found" });
        }
    
        return res.status(200).json({ message: "Expense updated successfully", expence });
    };

    //delete expences
    const deleteExpence = async (req, res, next) => {
        const id = req.params.id;
    
        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
    
        let expence;
    
        try {
            // Find the expense by ID and delete it
            expence = await Expences.findByIdAndDelete(id);
        } catch (err) {
            console.log("Error deleting expense:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    
        // Expense not found
        if (!expence) {
            return res.status(404).json({ message: "Expense not found" });
        }
    
        return res.status(200).json({ message: "Expense deleted successfully" });
    };
    
    
   
    exports.getAllExpences = getAllExpences;
    exports.addExpences = addExpences;
    exports.getById = getById;
    exports.updateExpence = updateExpence;
    exports.deleteExpence = deleteExpence;


