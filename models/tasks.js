const mongoose = require('mongoose');

// const proposalSchema = new mongoose.Schema({
//     proposalDiscription: {
//         type: String,
//         required: true
//     },
//     proposedAmount:{
//         type: String

//     },

//     proposedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }
// });




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
    // ,
    // proposal: [proposalSchema]
  
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);