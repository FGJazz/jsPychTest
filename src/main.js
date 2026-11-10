import { initJsPsych } from 'jspsych';
import htmlButtonResponse from '@jspsych/plugin-html-button-response';
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import 'jspsych/css/jspsych.css';
import './style.css';
import { summarizeTrials } from './results.js';

const jsPsych = initJsPsych({
  display_element: 'experiment',
  on_finish: () => {
    document.getElementById('experiment').innerHTML = `
      <div class="card">
        <p class="eyebrow">Experiment complete</p>
        <h1>Thanks for taking part.</h1>
        <p>Refresh this page to try the experiment again.</p>
      </div>
    `;
  },
});

const welcome = {
  type: htmlButtonResponse,
  stimulus: `
    <div class="card">
      <p class="eyebrow">A jsPsych example</p>
      <h1>How fast can you react?</h1>
      <p>You'll see 10 colored words, one at a time. Respond as quickly and accurately as you can.</p>
      <div class="instructions">
        <p><kbd>F</kbd> for <strong class="blue-text">BLUE</strong></p>
        <p><kbd>J</kbd> for <strong class="orange-text">ORANGE</strong></p>
      </div>
      <p class="note">You'll need a keyboard. Your results stay in your browser unless you download them.</p>
    </div>
  `,
  choices: ['Start experiment'],
};

const reactionTrial = {
  type: htmlKeyboardResponse,
  stimulus: () => {
    const color = jsPsych.evaluateTimelineVariable('color');
    return `
      <div class="card">
        <p class="eyebrow">Press F for blue &nbsp; / &nbsp; J for orange</p>
        <p class="stimulus ${color}">${color.toUpperCase()}</p>
      </div>
    `;
  },
  choices: ['f', 'j'],
  data: {
    task: 'reaction',
    color: jsPsych.timelineVariable('color'),
    expected_response: jsPsych.timelineVariable('key'),
  },
  on_finish: (data) => {
    data.correct = data.response === data.expected_response;
  },
};

const trials = {
  timeline: [reactionTrial],
  timeline_variables: [
    { color: 'blue', key: 'f' },
    { color: 'orange', key: 'j' },
  ],
  repetitions: 5,
  randomize_order: true,
};

const results = {
  type: htmlButtonResponse,
  stimulus: () => {
    const summary = summarizeTrials(jsPsych.data.get().filter({ task: 'reaction' }).values());
    const reactionTime = summary.meanReactionTime === null ? '—' : `${summary.meanReactionTime} ms`;
    return `
      <div class="card">
        <p class="eyebrow">Your results</p>
        <h1>Nice work!</h1>
        <div class="results">
          <div><strong>${summary.correct} / ${summary.total}</strong><span>correct responses</span></div>
          <div><strong>${reactionTime}</strong><span>mean reaction time for correct responses</span></div>
        </div>
        <p class="note">Download your trial data as a CSV, or finish without saving it.</p>
      </div>
    `;
  },
  choices: ['Download CSV', 'Finish without saving'],
  on_finish: (data) => {
    if (data.response === 0) {
      jsPsych.data.get().filter({ task: 'reaction' }).localSave('csv', 'reaction-time-data.csv');
    }
  },
};

jsPsych.run([welcome, trials, results]);
