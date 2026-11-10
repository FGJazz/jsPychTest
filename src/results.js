export function summarizeTrials(trials) {
  const correctTrials = trials.filter((trial) => trial.correct);
  const meanReactionTime = correctTrials.length
    ? Math.round(correctTrials.reduce((total, trial) => total + trial.rt, 0) / correctTrials.length)
    : null;

  return {
    total: trials.length,
    correct: correctTrials.length,
    meanReactionTime,
  };
}
