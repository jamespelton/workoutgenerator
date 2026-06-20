# Workout Generator

A small Express + EJS web app that builds a structured weekly workout plan from
your goal, experience level, days per week, and available equipment.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:3000

No API key is required — workout plans are generated deterministically in
`workout.js`. Copy `.env.example` to `.env` only if you want to wire up an
optional AI generation path later.

## Routes

- `GET /` — the workout form
- `POST /generate` — renders a generated plan from the submitted form
- `GET /health` — JSON health check

## Notes

This branch adds a print option, a reassuring form footer, and a result-page
action row. See the PR for details.

## Project layout

- `app.js` — Express server + routes
- `workout.js` — plan-generation logic (goals, splits, exercise pools)
- `views/index.ejs` — the form
- `views/result.ejs` — the rendered plan
- `public/style.css` — styles

<!-- ito re-trigger 20260620T194143Z -->
