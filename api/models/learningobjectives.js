const mongoose = require('mongoose');
const {User} = require('./user');

const learningObjectiveSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  ClassSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassSession',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: ()=>Date.now(),
  }
});

const classSessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  learningObjectives: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningObjective'
  }]
});

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  classSessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassSession'
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const studentSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },  
  learningObjectives: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningObjective'
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
});

const LearningObjective = mongoose.model('LearningObjective', learningObjectiveSchema);
const ClassSession = mongoose.model('ClassSession', classSessionSchema);
const Class = mongoose.model('Class', classSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = {
  LearningObjective,
  ClassSession,
  Class,
  Student
};
