# Atelier

## Setup
- **Clone/pull repo**
- `npm install`
- Create a GitHub authorization token and store it in **`config.js`** (make sure it's `.gitignored`).
- `npm start` for the server
- `npm run build` (in a separate terminal) for webpack/react/index.html
- Navigate to `http://localhost:3000` in browser

## Contributing
- Install Pomander before attempting to push commits:
- `curl -s https://raw.githubusercontent.com/reactorcore/pomander/master/bin/install | bash`

## Documentation
- Documentation such as diagrams for the app and UX styling guidelines are stored in the **`./docs`** directory.

## Team Members
- [Alex Cakic](https://github.com/aleksandar-cakic) - [Engineering Journal](https://gist.github.com/aleksandar-cakic/1f46fd75b3cefb7857a5bdbae9a6a53b)
- [Mark Thomas](https://github.com/MarkPThomas) - [Engineering Journal](https://gist.github.com/MarkPThomas/7ce6b7a2a48820ad1995afc5ee6ba506)
- [Steven Harder](https://github.com/stevenharderjr) - [Engineering Journal](https://gist.github.com/stevenharderjr/b2f158790eddc6b6257553fba2875694)
- [Vinh Huynh](https://gist.github.com/VinhH2402) - [Engineering Journal](https://gist.github.com/VinhH2402/28cd9f47f11ed1aef2836052cf96654d)


## Testing
- [Jest](https://jestjs.io/) is the framework chosen to test React and probably all JavaScript code in the app.
- Tests are located in the **`./tests`** directory
- ```npm test``` to run the tests

# Continuous Integration
Basic test of JavaScript continuous integration.

Travis CI: [![Build Status](https://travis-ci.com/rpp29-fec-gouda/atelier.svg?branch=main)](https://travis-ci.com/rpp29-fec-gouda/atelier.svg?branch=main)

Coveralls: [![Coverage Status](https://coveralls.io/repos/github/rpp29-fec-gouda/atelier/badge.svg?branch=main)](https://coveralls.io/github/rpp29-fec-gouda/atelier?branch=main)

# SonarCloud

Quality: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=continuous-integration-js&metric=alert_status)](https://sonarcloud.io/dashboard?id=continuous-integration-js)

Maintainability: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=continuous-integration-js&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=continuous-integration-js)

Reliability: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=continuous-integration-js&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=continuous-integration-js)

Security: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=continuous-integration-js&metric=security_rating)](https://sonarcloud.io/dashboard?id=continuous-integration-js)

Lines of Code: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=continuous-integration-js&metric=ncloc)](https://sonarcloud.io/dashboard?id=continuous-integration-js)

Coverage: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=continuous-integration-js&metric=coverage)](https://sonarcloud.io/dashboard?id=continuous-integration-js)

Bugs: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=continuous-integration-js&metric=bugs)](https://sonarcloud.io/dashboard?id=continuous-integration-js)

Code Smells: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=continuous-integration-js&metric=code_smells)](https://sonarcloud.io/dashboard?id=continuous-integration-js)

Technical Debt: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=continuous-integration-js&metric=sqale_index)](https://sonarcloud.io/dashboard?id=continuous-integration-js)