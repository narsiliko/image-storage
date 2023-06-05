# Image Storage

This project made with Angular 16, RxJs and Ng-Zorro Ant Design library

All of the technical requirements has been done:\
[✔] Application have only two components on one screen\
[✔] Possibility of search and add images from Giphy with its public API\
[✔] Images can be added by any way (in this solution by clicking a button)\
[✔] Possibility of search through added images by name\
[✔] Possibility to sort images by date added (and additionally by name)\
[✔] Possibility to sort images manually by drag and drop (for behavioral consistency drag and drop available only when storage query string is empty)\
[✔] Possibility of downloading images\
[✔] Images need to be stored in localStorage\
[✔] Search images on Giphy must exclude already added images\
[✔] Any action does not cause page reload\
[✔] After image added it appear in storage without page reload\

## Known issues
- Because Giphy API does not allow to exclude any image (e.g. by `id`), this functionality has been implemented on frontend side
- Sorting of stored images in interface immediately cause sorting of them in localStorage. This behavior has been implemented for application workflow consistency. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
