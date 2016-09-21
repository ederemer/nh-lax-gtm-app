var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OpportunitySchema = new Schema({
		"type": String,
        "account": String,
        "lead": String,
        "lastContact": { type: Date, default: Date.now },
        "opportunityName": String,
        "opportunityStatus": String,
        "is_archived": { type: Boolean, default: false }
}, { collection: 'opportunities' });

module.exports = mongoose.model('Opportunity', OpportunitySchema);