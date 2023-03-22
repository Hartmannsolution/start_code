const express = require('express');
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  

// Routes
const usersRouter = require('./routes/users');
const addressesRouter = require('./routes/addresses');
const loginRouter = require('./routes/login');
const learningObjectivesRouter = require('./routes/learningobjectives');

// Mongoose models
// const User = require('./models/user'); 

// Create mongoose connection
mongoose.set('strictQuery', false);
// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create the Express application
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/learningobjectives', learningObjectivesRouter);
app.use('/api/user', usersRouter);
app.use('/api/address', addressesRouter);
app.use('/api/login', loginRouter);

// Start the Express server
const port = process.env.PORT || 3080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
