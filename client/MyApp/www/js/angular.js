
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
        templateUrl:'home.html'
    })
    .when('/page2', {
        controller: 'PageController',
        templateUrl:'page2.html'
    })
    .when('/mes-ues', {
        controller: 'PageController',
        templateUrl:'mes-ues.html'
    });
});


app.controller('UEsController', function($scope) {
    this.ues = MyDatas.myUES;
    this.allUes = [];

    console.log("UEsController:: Liste de ses UES : "+this.ues);

    this.testUes = function() {
        var that = this;
        console.log("UEsController:: testUes()");
        Ni.GetAllUes(function(list) {
            console.log("UEsController:: AllUEs reçues");
            that.allUes = list;
            $scope.$apply();
        });
    };
});
