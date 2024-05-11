const mongoose = require('mongoose')

const approvedeventSchema = new mongoose.Schema({
  eventName: {
     type: String,
 },
 competitions: String,
 department: {
     type: String,
 },
 eventDesc: String,
 eventDate: {
     type: Date,
 },
 hall: {
     type: String,
 },
 facultyCoordinators: String,
 facultyMail: {
     type: String,
     match: /^\S+@\S+\.\S+$/ 
 }

   

});

const approvedEvents = mongoose.model('approvedEvents',approvedeventSchema)

module.exports=approvedEvents;