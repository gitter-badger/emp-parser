var app = angular.module('edt', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'PageController',
        templateUrl: 'content/home.html'
    })
    .when('/page2', {
        controller: 'PageController',
        templateUrl: 'content/page2.html'
    })
    .when('/mes-ues', {
        controller: 'PageController',
        templateUrl: 'content/mes-ues.html'
    })
    .when('/select-ue', {
        controller: 'PageController',
        templateUrl: 'content/select-ue.html'
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
    .otherwise({
        controller: 'PageController',
        templateUrl:'content/404.html'
    });
});
