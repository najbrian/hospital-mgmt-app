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

router.get('/:id', async (req,res) => {
  try {
    const record = await PatientRecord.findById(req.params.id)
    .populate('visit')
    res.status(200).json(record)
  } catch {
    res.status(404).json({ error: 'Record not found' })
  }
})

router.put( '/:id', async (req, res) => {
  try {
    const updatedRecord = await PatientRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedRecord)
  } catch {
    res.status(404).json({ error: 'Record not found' })
  }
})

router.delete('/:id', async (req,res) => {
  try {
    const deletedRecord = await PatientRecord.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedRecord)
  } catch {
    res.status(500).json({ error: 'Record not found' })
  }
})


module.exports = router;