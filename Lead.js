const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  source: {
    type: String,
    enum: ['Website', 'LinkedIn', 'Referral', 'Email', 'Other'],
    default: 'Website'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'lost'],
    default: 'new'
  },
  company: { type: String, trim: true },
  notes: [noteSchema],
  followUpDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lead', leadSchema);
