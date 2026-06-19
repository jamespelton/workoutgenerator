// Deterministic workout plan generator.
// Runs with NO external API key. If process.env.OPENAI_API_KEY is set, app.js
// can optionally route through the AI path, but the demo works fully offline.

const GOALS = {
  strength: {
    label: 'Build Strength',
    rep_range: '4-6 reps',
    rest: '2-3 min rest',
    focus: 'heavy compound lifts',
  },
  muscle: {
    label: 'Build Muscle',
    rep_range: '8-12 reps',
    rest: '60-90 sec rest',
    focus: 'hypertrophy volume',
  },
  endurance: {
    label: 'Endurance / Conditioning',
    rep_range: '15-20 reps',
    rest: '30-45 sec rest',
    focus: 'circuits and conditioning',
  },
  fatloss: {
    label: 'Fat Loss',
    rep_range: '12-15 reps',
    rest: '45 sec rest',
    focus: 'supersets and short rest',
  },
};

const EXERCISES = {
  gym: {
    push: ['Barbell Bench Press', 'Overhead Press', 'Incline Dumbbell Press', 'Tricep Pushdown'],
    pull: ['Deadlift', 'Barbell Row', 'Lat Pulldown', 'Face Pull'],
    legs: ['Back Squat', 'Romanian Deadlift', 'Leg Press', 'Walking Lunge'],
    full: ['Back Squat', 'Bench Press', 'Barbell Row', 'Overhead Press'],
  },
  dumbbells: {
    push: ['Dumbbell Bench Press', 'Dumbbell Shoulder Press', 'Incline DB Fly', 'DB Skullcrusher'],
    pull: ['One-Arm DB Row', 'DB Pullover', 'DB Reverse Fly', 'DB Curl'],
    legs: ['Goblet Squat', 'DB Romanian Deadlift', 'DB Walking Lunge', 'DB Calf Raise'],
    full: ['Goblet Squat', 'DB Bench Press', 'One-Arm DB Row', 'DB Shoulder Press'],
  },
  bodyweight: {
    push: ['Push-Up', 'Pike Push-Up', 'Dips', 'Diamond Push-Up'],
    pull: ['Pull-Up', 'Inverted Row', 'Chin-Up', 'Towel Row'],
    legs: ['Bodyweight Squat', 'Bulgarian Split Squat', 'Glute Bridge', 'Calf Raise'],
    full: ['Burpee', 'Push-Up', 'Bodyweight Squat', 'Mountain Climber'],
  },
};

function setsForLevel(level) {
  if (level === 'beginner') return 3;
  if (level === 'intermediate') return 4;
  return 5; // advanced
}

// Choose a weekly split based on how many days the user trains.
function splitForDays(days) {
  if (days <= 2) return ['full', 'full'].slice(0, days);
  if (days === 3) return ['push', 'pull', 'legs'];
  if (days === 4) return ['push', 'pull', 'legs', 'full'];
  if (days === 5) return ['push', 'pull', 'legs', 'push', 'pull'];
  return ['push', 'pull', 'legs', 'push', 'pull', 'legs'].slice(0, days);
}

/**
 * Build a structured plan.
 * @param {Object} opts { goal, level, daysPerWeek, equipment }
 * @returns {Object} { title, summary, days: [{ name, focus, exercises:[{name,sets,reps,rest}] }] }
 */
function generatePlan(opts) {
  const goal = GOALS[opts.goal] ? opts.goal : 'muscle';
  const level = ['beginner', 'intermediate', 'advanced'].includes(opts.level)
    ? opts.level
    : 'beginner';
  let days = parseInt(opts.daysPerWeek, 10);
  if (!Number.isFinite(days) || days < 1) days = 3;
  if (days > 6) days = 6;
  const equipment = EXERCISES[opts.equipment] ? opts.equipment : 'bodyweight';

  const g = GOALS[goal];
  const sets = setsForLevel(level);
  const split = splitForDays(days);

  const planDays = split.map((focusKey, i) => {
    const pool = EXERCISES[equipment][focusKey];
    const focusLabel =
      focusKey === 'full' ? 'Full Body' : focusKey.charAt(0).toUpperCase() + focusKey.slice(1);
    return {
      name: `Day ${i + 1}`,
      focus: focusLabel,
      exercises: pool.map((name) => ({
        name,
        sets,
        reps: g.rep_range,
        rest: g.rest,
      })),
    };
  });

  return {
    title: `${g.label} — ${level.charAt(0).toUpperCase() + level.slice(1)} (${days}x/week)`,
    summary: `A ${days}-day ${equipment} plan focused on ${g.focus}. Each session is ${sets} sets per exercise in the ${g.rep_range} range with ${g.rest}.`,
    days: planDays,
  };
}

module.exports = { generatePlan, GOALS, EXERCISES };
