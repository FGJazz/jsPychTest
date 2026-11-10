// Classic script (no modules) so the page also works when opened via file://
globalThis.summarizeTrials = function summarizeTrials(trials) {
  const correctTrials = trials.filter((trial) => trial.correct);
  const meanReactionTime = correctTrials.length
    ? Math.round(correctTrials.reduce((total, trial) => total + trial.rt, 0) / correctTrials.length)
    : null;

  return {
    total: trials.length,
    correct: correctTrials.length,
    meanReactionTime,
  };
};
