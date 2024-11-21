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
  status: {
    type: String,
    enum: ['Admitted', 'Discharged', 'Waiting', 'LEFT AGAINST MEDICAL ADVICE OR DISCONTINUED CARE',],
    required: true
  },
  checkedInBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
},
{ timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);