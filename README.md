# jsPsych reaction time example

A small browser-based experiment built with [jsPsych](https://www.jspsych.org/). Participants press **F** for BLUE and **J** for ORANGE across 10 randomized trials, then see their accuracy and mean reaction time for correct responses.

## Run locally

No build step or server is needed: open `index.html` in a browser (a keyboard is required). `npm test` (Node.js 20+) runs the summary calculation tests.

## Vendored jsPsych

The jsPsych **6.3.1** library, its html-button-response and html-keyboard-response plugins, stylesheet, and license are checked in under `vendor/jspsych/`. The app loads these local files with relative paths, so it also works from `file://`. The stylesheet is unchanged except for removing its external Google Fonts import.

## How it works

`src/main.js` defines a jsPsych timeline with an instructions screen, five trials of each color in randomized order, and a results screen. The keyboard-response plugin records the response and reaction time in milliseconds; the experiment adds the expected key and correctness to each trial.

The results screen offers an optional CSV download containing the reaction trials and their jsPsych data. Nothing is sent to a server or saved automatically. Refreshing or closing the page discards any data that has not been downloaded. This is a demonstration, not a validated research protocol.
