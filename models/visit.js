const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{ timestamps: true });

const visitSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientRecord',
    required: true
  },
  status: {
    type: String,
    enum: ['Admitted', 'Discharged', 'Waiting', 'LEFT AGAINST MEDICAL ADVICE OR DISCONTINUED CARE',],
    required: true
  },
  checkedinby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  treatment: {
    type: String,
    required: true
  },
  notes: [notesSchema]
},
{ timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);