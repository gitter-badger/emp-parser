var app = angular.module('edt', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'PageController',
        templateUrl: 'content/home.html',
        resolve: {
            promise: function (Loader) {
                return Loader.promise;
            }
        }
    })
    .when('/mes-ues', {
        controller: 'PageController',
        templateUrl: 'content/mes-ues.html',
        resolve: {
            promise: function (Loader) {
                return Loader.promise;
            }
        }
    })
    .when('/select-ue', {
        controller: 'PageController',
        templateUrl: 'content/select-ue.html',
        resolve: {
            promise: function (Loader) {
                return Loader.promise;
            }
        }
    })
    .when('/calendar', {
        controller: 'PageController',
        templateUrl: 'content/calendar.html',
        resolve: {
            promise: function (Loader) {
                return Loader.promise;
            }
        }
    })
    .when('/settings', {
        controller: 'PageController',
        templateUrl: 'content/settings.html',
        resolve: {
            promise: function (Loader) {
                return Loader.promise;
            }
        }
    })
    .when('/about', {
        controller: 'PageController',
        templateUrl: 'content/about.html',
        resolve: {
            promise: function (Loader) {
                return Loader.promise;
            }
        }
    })
    .otherwise({
        controller: 'PageController',
        templateUrl:'content/404.html'
    });
});
