# Benefitz Frontend

Benefitz. A social webapp for volunteers and people in need.


## Getting Started

This project was developed during the CAS FEE 2016/2017@ HSR. This is the frontend part of the app, the backend is located here: [Benefitz Backend on GitHub](https://github.com/mfluorhsr/projekt2).
See Prerequisites and Installation for instructions on how to get the app up and running.


### Prerequisites

You need [node.js](https://nodejs.org/en/) with [angular-cli](https://cli.angular.io/) to compile the frontend.
The frontend will need the backend already running to display any data and work as intended.


### Installation

Once you have installed node.js, npm and angular-cli. clone this github repo and navigate to the project root.

Install all dependencies trough

```
npm install
```

Then run the server

```
ng serve
```

If everything works, you will see
```
webpack: Compiled successfully.
```
printed to your console. You can now go ahead and use the app on http://localhost:4200.


## Getting people together

### List or map view 
![two](https://cloud.githubusercontent.com/assets/22084005/24566921/c378e420-165b-11e7-8f2b-9bb1218dd4cb.png)

### Dashboard for institutions
![three](https://cloud.githubusercontent.com/assets/22084005/24566922/c379908c-165b-11e7-8d3c-1c05fcacdc63.png)

### Responsive
![four](https://cloud.githubusercontent.com/assets/22084005/24566920/c361a634-165b-11e7-8c72-7fd96237c50d.png)

### English or German
![one](https://cloud.githubusercontent.com/assets/22084005/24566919/c360c192-165b-11e7-87cc-ceae39100a19.png)


## Built With

* [Angular2](https://angular.io/)
* [angular-cli](https://github.com/angular/angular-cli)
* [materialize](http://materializecss.com/)
* [auth0](https://auth0.com/)

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

