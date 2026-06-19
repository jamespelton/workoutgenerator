const express = require('express');
const path = require('path');
const { generatePlan } = require('./workout');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home — the workout form
app.get('/', (req, res) => {
  res.render('index');
});

// Generate a workout plan from the submitted form.
// Works with no API key: plan is built deterministically in workout.js.
app.post('/generate', (req, res) => {
  const { goal, level, days, equipment } = req.body;

  const plan = generatePlan({ goal, level, daysPerWeek: days, equipment });

  res.render('result', { plan });
});

// Simple health check (handy for the QA container)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Workout Generator running on port ${PORT}`);
});

module.exports = app;
