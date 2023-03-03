const express = require('express');
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const usersRouter = require('./routes/users');


const User = require('./models/user'); 
const learningObjectivesRouter = require('./routes/learningobjectives');

const app = express();

app.use(bodyParser.json());

mongoose.set('strictQuery', false);
// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/learningobjectives', learningObjectivesRouter);
app.use('/api', usersRouter);

//
// Create a new user in the database
// app.post('/api/users', async (req, res) => {
//   // const user = new User({
//   //   name: req.body.name,
//   //   email: req.body.email,
//   //   password: req.body.password
//   // });
//   const user = new User(req.body);
//   await user.save();
//   res.send('User saved in the database');
// });

// Retrieve all users from the database
app.get('/api/users', async (req, res) => {
  // res.header('Content-Security-Policy', 'default-src *; script-src *; style-src *; img-src *; font-src *; connect-src *; media-src *; object-src *; frame-src *; worker-src *; child-src *; form-action *; frame-ancestors *; plugin-types *; base-uri *; manifest-src *; report-uri *; report-to *; block-all-mixed-content; upgrade-insecure-requests; require-sri-for script style; sandbox allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation; disown-opener; referrer no-referrer; referrer no-referrer-when-downgrade; referrer origin; referrer origin-when-cross-origin; referrer strict-origin; referrer strict-origin-when-cross-origin; referrer unsafe-url; reflected-xss block; reflected-xss filter; reflected-xss prevent; reflected-xss allow;');
  res.json({ "users": "users" });
});

// Start the Express server
const port = process.env.PORT || 3080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
