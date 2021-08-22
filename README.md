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
- See the [web style guide](./docs/web-style-guide.md) for the standards we are following for coding and project organization.

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
Basic test of JavaScript continuous integration uses [CircleCI](https://circleci.com/) to run the tests, and [Coveralls](https://coveralls.io/) for reporting test coverage.

Circle CI: [![rpp29-fec-gouda](https://circleci.com/gh/rpp29-fec-gouda/atelier.svg?style=svg)](https://app.circleci.com/pipelines/github/rpp29-fec-gouda/atelier)

Coveralls: [![Coverage Status](https://coveralls.io/repos/github/rpp29-fec-gouda/atelier/badge.svg)](https://coveralls.io/github/rpp29-fec-gouda/atelier)

# SonarCloud
Additionally, [SonarCloud](https://sonarcloud.io/projects) is used for an overall check of code quality.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=alert_status)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

Quality: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=alert_status)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

Maintainability: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

Reliability: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

Security: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=security_rating)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

Lines of Code: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=ncloc)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

Coverage: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=coverage)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

Bugs: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=bugs)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

Code Smells: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=code_smells)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

Technical Debt: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=rpp29-fec-gouda_atelier&metric=sqale_index)](https://sonarcloud.io/dashboard?id=rpp29-fec-gouda_atelier)

# Demos
Below are some brief descriptions of the various app components, with animations showing their dynamic behavior.

## Atelier
Lorem ipsum, I sayum! Lorem ipsum, I sayum!

<img alt="atelier demo" src="./docs/demos/demo_po.gif" width="50%" />

## Product Overview
Lorem ipsum, I sayum! Lorem ipsum, I sayum!

### Image Gallery
Lorem ipsum, I sayum! Lorem ipsum, I sayum!

https://user-images.githubusercontent.com/6684303/130370001-9988c092-f074-426a-9003-9fa844883840.mp4


#### Carousel Navigation (TBD)
Lorem ipsum, I sayum! Lorem ipsum, I sayum!
Component complete but need more than 1 thumbnail to demo...


### Stars & Reviews
Lorem ipsum, I sayum! Lorem ipsum, I sayum!

<img alt="stars and reviews demo" src="./docs/demos/overview/po-starsAndReviews.gif" width="50%" />

### Select Styles
Lorem ipsum, I sayum! Lorem ipsum, I sayum!

<img alt="select styles demo" src="./docs/demos/overview/po-styleSelector.gif" width="50%" />

### Shopping Cart
Lorem ipsum, I sayum! Lorem ipsum, I sayum!

<img alt="shopping cart demo" src="./docs/demos/overview/po-cart.gif" width="50%" />

You are not allowed to add to cart unless a size is chosen:

<img alt="shopping cart edge case demo" src="./docs/demos/overview/po-cartPrompt.gif" width="50%" />
