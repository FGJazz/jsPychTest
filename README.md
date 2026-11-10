# jsPsych reaction time example

A small browser-based experiment built with [jsPsych](https://www.jspsych.org/). Participants press **F** for BLUE and **J** for ORANGE across 10 randomized trials, then see their accuracy and mean reaction time for correct responses.

## Run locally

Requires Node.js 20.19 or newer and a keyboard.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`; use `npm run preview` to serve that build locally. Run `npm test` for the summary calculation tests.

## How it works

`src/main.js` defines a jsPsych timeline with an instructions screen, five trials of each color in randomized order, and a results screen. The keyboard-response plugin records the response and reaction time in milliseconds; the experiment adds the expected key and correctness to each trial.

The results screen offers an optional CSV download containing the reaction trials and their jsPsych data. Nothing is sent to a server or saved automatically. Refreshing or closing the page discards any data that has not been downloaded. This is a demonstration, not a validated research protocol.
