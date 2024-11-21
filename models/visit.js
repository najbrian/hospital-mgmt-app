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
});

const visitSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Admitted', 'Discharged', 'Waiting', 'Left without being seen', 'LEFT AGAINST MEDICAL ADVICE OR DISCONTINUED CARE', 'HOSPITALIZED', 'DECEASED'],
    required: true
  },
  checkedInBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: [notesSchema],
  diagnosis: {
    type: String,
    required: true
  },
  treatment: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Visit', visitSchema);