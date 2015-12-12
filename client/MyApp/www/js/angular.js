
var app = angular.module('edt', ['ngRoute']);


app.controller('PageController', function($scope, $location) {
    $scope.goPage = function(page) {
        $location.path(page);
    };
});

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'PageController',
        templateUrl:'content/home.html'
    })
    .when('/page2', {
        controller: 'PageController',
        templateUrl:'content/page2.html'
    })
    .when('/mes-ues', {
        controller: 'PageController',
        templateUrl:'content/mes-ues.html'
    })
    .when('/select-ue', {
        controller: 'PageController',
        templateUrl:'content/select-ue.html'
    })
    .otherwise({
        controller: 'PageController',
        templateUrl:'content/404.html'
    });
});


app.controller('UEsController', function($scope) {
    this.ues = MyDatas.myUES;
    console.log("UEsController:: Liste de ses UES : "+this.ues);
});

app.controller('UesSelectorController', function($scope) {
    this.allUes = [];
    this.limitUE = 10;
    this.isLoad = false;
    var that = this;


    console.log("UEsController:: loadUes()");
    Ni.GetAllUes(function(list) {
        console.log("UEsController:: AllUEs reçues");
        that.allUes = list;
        that.isLoad = true;
        $scope.$apply();
    });

    this.getAllUes = function(search) {
        console.log(search);
        if (search.Description != '') {
            return this.allUes;
        } else {
            return [];
        }
    }
});