const express = require('express');
const router = express.Router();
const Visit = require('../models/visit');
const verifyToken = require('../middleware/verify-token');

router.use(verifyToken)

router.get('/', async (req, res) => {
  try {
    const visits = await Visit.find({})
    .populate('checkedinby')
    .populate('notes')
    .sort({date: -1})
    res.status(200).json(visits)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    req.body.checkedinby = req.user._id;
    const visit = await Visit.create(req.body)
    res.status(201).json(visit)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/:id', async (req,res) => {
  try {
    const visit = await Visit.findById(req.params.id)
    .populate('checkedinby')
    res.status(200).json(visit)
  } catch {
    res.status(404).json({ error: 'Visit not found' })
  }
})

router.put( '/:id', async (req, res) => {
  try {
    const updatedVisit = await Visit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedVisit)
  } catch {
    res.status(404).json({ error: 'Visit not found' })
  }
})

router.delete('/:id', async (req,res) => {
  try {
    const deletedVisit = await Visit.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedVisit)
  } catch {
    res.status(500).json({ error: 'Visit not found' })
  }
})

module.exports = router;