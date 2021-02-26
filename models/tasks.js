const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({ 
    taskName: {
        type: String
    },
    categoryType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'      
    },
    discription: {
        type: String,
        require: true
    },  
    skills:{
       type:String
   },
    amount:{
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    files:{
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);