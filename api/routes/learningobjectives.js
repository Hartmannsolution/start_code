const express = require('express');
const router = express.Router();
const { User, LearningObjective, Progress } = require('../models/learningobjectives');

router.get('/', async (req, res) => {
  try {
    const learningObjectives = await LearningObjective.find();
    res.status(200).json({ success: true, data: learningObjectives });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    // const { user, week, learningObjective } = req.body;
    const { user } = req.body;
    const newUser = new User(user);
    await newUser.save();
    // const newLearningObjective = new LearningObjective(learningObjective);
    // await newLearningObjective.save();
    // const progress = new Progress({
    //   user: newUser,
    //   week,
    //   learningObjective: newLearningObjective,
    // });
    // await progress.save();
    res.status(200).json({ success: true, message: 'Data saved successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
