const mongoose = require('mongoose');

const learningObjectiveSchema = new mongoose.Schema({
  week: Number,
  text: String,
  id: Number,
});

const studentSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const ProgressSchema = new mongoose.Schema({
  user: studentSchema,
  week: Number,
  learningObjective: learningObjectiveSchema,
});

const Student = mongoose.model('Student', studentSchema);
const LearningObjective = mongoose.model('LearningObjective', learningObjectiveSchema);
const Progress = mongoose.model('Progress', ProgressSchema);

module.exports = {
  Student,
  LearningObjective,
  Progress,
};
