const mongoose = require('mongoose');

// Define the schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true,
  },
});

taskSchema.index({ title: 1 }, { unique: true });

// Create the model
const Task = mongoose.model('Task', taskSchema);

// Export the model
module.exports = Task;
