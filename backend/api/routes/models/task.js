const mongoose = require('mongoose'); 
// model danych 

const taskSchema = mongoose.Schema({
    title : String,
    description: String
});

module.exports = mongoose.model("Task", taskSchema);