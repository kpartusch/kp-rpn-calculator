# RPN Calculator
[![Build Status](https://travis-ci.org/kpartusch/kp-rpn-calculator.svg?branch=master)](https://travis-ci.org/kpartusch/kp-rpn-calculator)

This application represents a reverse polish notation (RPN) calculator. It also demonstrates a CI/CD pipeline using Travis CI and Heroku.

## Development Notes

In order to get started with the application, the first thing you need to run is `npm install` to download all the application dependencies. Next, 
you will need to run `npm run dev-build` to compile both the nodejs server and Angular client. Finally, you can run `npm run start` to start the 
nodejs server and navigate to `http://localhost:3001/` to start using the calculator. You can also submit inputs to the calculator via the command 
line using the following URI `http://localhost:3001/api/calculation`.

## Running unit tests

Run `npm run test` to execute the unit tests for the server via [Mocha](https://mochajs.org/) and `npm run test-client` to execute the unit tests 
for the client via [Karma](https://karma-runner.github.io).

## Further hints

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
