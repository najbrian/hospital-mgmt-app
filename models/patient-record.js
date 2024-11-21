const mongoose = require('mongoose');

const patientRecordSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  pcp: {
    type: String,
  },
  visit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visit'
  },
});

module.exports = mongoose.model('PatientRecord', patientRecordSchema);