const express = require('express');
const router = express.Router();
const PatientRecord = require('../models/patient-record');
const verifyToken = require('../middleware/verify-token');

router.use(verifyToken)

router.get('/', async (req, res) => {
  try {
    const records = await PatientRecord.find({})
    .populate('visit')
    .sort({createdAt: -1, status: 1})
    res.status(200).json(records)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const record = await PatientRecord.create(req.body)
    res.status(201).json(record)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})


module.exports = router;