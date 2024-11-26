const express = require('express');
const router = express.Router();
const Visit = require('../models/visit');
const verifyToken = require('../middleware/verify-token');

router.use(verifyToken)

// Gets all visits by patient
router.get('/:patientId', async (req, res) => {
  try {
    const visits = await Visit.find({patient: req.params.patientId})
    .populate('checkedinby')
    .sort({date: -1})
    res.status(200).json(visits)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get a single visit
router.get('/:patientId/:visitId', async (req,res) => {
  try {
    const visit = await Visit.findById(req.params.visitId)
    .populate('checkedinby')
    res.status(200).json(visit)
  } catch {
    res.status(404).json({ error: 'Visit not found' })
  }
})

// Create a new visit
router.post('/', async (req, res) => {
  try {
    req.body.checkedinby = req.user._id;
    const visit = await Visit.create(req.body)
    res.status(201).json(visit)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update a visit
router.put( '/:patientId/:visitId', async (req, res) => {
  try {
    const updatedVisit = await Visit.findByIdAndUpdate(
      req.params.visitId,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedVisit)
  } catch {
    res.status(404).json({ error: 'Visit not found' })
  }
})

// Delete a visit
router.delete('/:patientId/:visitId', async (req,res) => {
  console.log('req.user:', req.user.credentials);
  try {
    if (req.user.credentials !== 'Level-1') {
      return res.status(401).json({ error: 'You are not authorized to delete this visit' })
    }
    const deletedVisit = await Visit.findByIdAndDelete(req.params.visitId)
    res.status(200).json(deletedVisit)
  } catch {
    res.status(404).json({ error: 'Visit not found' })
  }
})

// Get notes for a visit
router.get('/:patientId/notes', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.patientId)
    .populate('notes')
    .sort({date: -1})
    res.status(200).json(visit.notes)
  } catch {
    res.status(404).json({ error: 'Visit not found' })
  }
})

// Add a note to a visit
router.post('/:patientId/notes', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.patientId)
    visit.notes.push({ ...req.body, owner: req.user._id });
    await visit.save()
    res.status(201).json(visit.notes)
  } catch (error) {
    res.status(404).json({ error: 'Visit not found' })
  }
})

// Update a note for a visit
router.put('/:patientId/notes/:noteId', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.patientId)
    const note = visit.notes.id(req.params.noteId)
    if (!note.owner.equals(req.user._id)) {
      return res.status(401).json({ error: 'You are not authorized to update this note' })
    }
    note.set(req.body)
    await visit.save()
    res.status(200).json(note)
  } catch (error) {
    res.status(404).json({ error: 'Visit or note not found' })
  }
})

// Delete a note for a visit
router.delete('/:patientId/notes/:noteId', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.patientId)
    if (!visit.notes.id(req.params.noteId).owner.equals(req.user._id) || req.user.credentials !== 'Level-1') {
      return res.status(401).json({ error: 'You are not authorized to delete this note' })
    }
    visit.notes.id(req.params.noteId).remove()
    await visit.save()
    res.status(200).json(visit.notes)
  } catch {
    res.status(404).json({ error: 'Visit or note not found' })
  }
})

module.exports = router;