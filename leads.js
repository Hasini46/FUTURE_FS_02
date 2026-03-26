const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

// GET /api/leads - Get all leads
router.get('/', auth, async (req, res) => {
  try {
    const { status, source, search } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ];
    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/leads - Create lead
router.post('/', auth, async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/leads/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/leads/:id - Update lead
router.put('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/leads/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/leads/:id/notes - Add note
router.post('/:id/notes', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    lead.notes.push({ text: req.body.text });
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/leads/:id/notes/:noteId
router.delete('/:id/notes/:noteId', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    lead.notes = lead.notes.filter(n => n._id.toString() !== req.params.noteId);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
