const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    proposalDiscription: {
        type: String,

    },
    proposedAmount: {
        type: String

    },
   
    proposedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Proposal', proposalSchema);