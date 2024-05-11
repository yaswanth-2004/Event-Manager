const mongoose = require('mongoose');

const participantDetailSchema = new mongoose.Schema({
 name:String,
 eventName:String,
 department:String,
 section:String,
 phoneNumber:String
});

const ParticipantDetail = mongoose.model('ParticipantDetail', participantDetailSchema);

module.exports = ParticipantDetail;