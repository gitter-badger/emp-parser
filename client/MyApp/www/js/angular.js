var app = angular.module('edt', ['ngRoute']);
init_angular();

function init_angular() {

    console.log('init_angular');

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
        .when('/calendar', {
            controller: 'PageController',
            templateUrl:'content/calendar.html'
        })
        .otherwise({
            controller: 'PageController',
            templateUrl:'content/404.html'
        });
    });


    app.controller('UEsController', function($scope) {

        this.contains = function(ue) {
            return MyDatas.containUE(ue);
        }

        this.getUes = function() {
            return MyDatas.getUes();
        }

        this.addUe = function(ue) {
            MyDatas.addUe(ue);
        }

        this.removeUe = function(ue) {
            MyDatas.removeUE(ue);
        }
    });

    app.controller('CalendarController', function($scope, $timeout) {
        this.creneaux = [];
        this.isLoad = false;

        var that = this;

        $timeout(function() {
            var ues = MyDatas.getUes();
            Ni.GetCreneaux(ues, function(list) {
                that.creneaux = list;
                that.isLoad = true;
                $scope.$apply();
            });
        }, 300); // Attente du chargement des UEs, à faire mieux

        console.log('CalendarController ready.');
    })

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
            if (search && search.Description != '') {
                return this.allUes;
            } else {
                return [];
            }
        }

    });

}
