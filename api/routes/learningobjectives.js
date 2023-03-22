const express = require('express');
const router = express.Router();
const { 
  Student,
  LearningObjective,
  Class,
  ClassSession
 } = require('../models/learningobjectives');

 // Create a new learning objective
 router.post('/learningObjectives', async (req, res) => {
   try {
     const { description, student } = req.body;
     const learningObjective = await LearningObjective.create({ description, student });
     res.status(201).json(learningObjective);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error creating learning objective' });
   }
 });
 
 // Add a learning objective to a class session
 router.post('/classSessions/:id/learningObjectives', async (req, res) => {
   try {
     const { id } = req.params;
     const { learningObjective } = req.body;
     const classSession = await ClassSession.findById(id);
     if (!classSession) {
       return res.status(404).json({ message: 'Class session not found' });
     }
     const createdLearningObjective = await LearningObjective.create(learningObjective);
     classSession.learningObjectives.push(createdLearningObjective);
     await classSession.save();
     res.status(201).json(createdLearningObjective);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error adding learning objective to class session' });
   }
 });
 
 // Create a new class
router.post('/classes', async (req, res) => {
  try {
    const { name } = req.body;
    const newClass = await Class.create({ name });
    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating class' });
  }
});

// Add students to a class
router.post('/classes/:id/students', async (req, res) => {
  try {
    const { id } = req.params;
    const { students } = req.body;
    const schoolClass = await Class.findById(id);
    if (!schoolClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    const createdStudents = await Student.create(students);
    schoolClass.students.push(...createdStudents);
    await schoolClass.save();
    res.status(201).json(createdStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding students to class' });
  }
});

// Add class sessions to a class
router.post('/classes/:id/classSessions', async (req, res) => {
  try {
    const { id } = req.params;
    const { classSessions } = req.body;
    const schoolClass = await Class.findById(id);
    if (!schoolClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    const createdClassSessions = await ClassSession.create(classSessions);
    schoolClass.classSessions.push(...createdClassSessions);
    await schoolClass.save();
    res.status(201).json(createdClassSessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding class sessions to class' });
  }
});

// Assign a learning objective to a student
router.post('/students/:id/learningObjectives', async (req, res) => {
  try {
    const { id } = req.params;
    const { learningObjective } = req.body;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const createdLearningObjective = await LearningObjective.create(learningObjective);
    student.learningObjectives.push(createdLearningObjective);
    await student.save();
    res.status(201).json(createdLearningObjective);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error assigning learning objective to student' });
  }
});

module.exports = router;
