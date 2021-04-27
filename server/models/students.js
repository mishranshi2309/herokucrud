 const mongoose = require("mongoose")
 const studentSchema =  mongoose.Schema({
     _id:mongoose.Schema.Types.ObjectId,    //autoincrement_id
    firstname:{type:String, require:true},
    lastname : {type:String, require:true},
    place :{type:String , require:true}
 });

module.exports = mongoose.model('Student', studentSchema);

// when schema is passed in model it specifies that schema can e accessed using student 