# Patient Management System

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

# Json-server Database

This project is comprised of json-server. It is a fake database created for REST services. To use json-server, install json-server from npm or yarn.
For more information visit https://www.npmjs.com/package/json-server

# Initialize project

To initialize project open a terminal and type the following

npm run start:proxy:mock:server

This will initialize the project with database with the custom routes.
You can also check the data on http://localhost:4200/patients

# Load Packages

Open a terminal to project directory and load the modules using command

npm install

## Login to the project

Username: admin

Password: 123456

The credentials are set into sessionStorage in login component.

You can change the structure and get credentials from server using services.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
