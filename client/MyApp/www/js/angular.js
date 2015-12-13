var app = angular.module('edt', ['ngRoute']);



app.controller('MainController', function($scope, $timeout, MyDatas) {
    console.log('Instance MainController.');
    var that = this;
    this.IsLoading = true;

    MyDatas.promise.then(function() {
        console.log('PageController:: endInit event recv');
        that.IsLoading = false;
        // $scope.$apply();
    });
});

app.controller('PageController', function($scope, $location, MyDatas) {
    $scope.goPage = function(page) {
        $location.path(page);
    };
});

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
        templateUrl: 'content/calendar.html'
    })
    .otherwise({
        controller: 'PageController',
        templateUrl:'content/404.html'
    });
});


app.controller('UEsController', function($scope, $timeout, MyDatas) {

    var that = this;

    that.contains = function(ue) {
        return MyDatas.containUE(ue);
    }

    that.getUes = function() {
        return MyDatas.getUes();
    }

    that.addUe = function(ue) {
        MyDatas.addUe(ue);
    }

    that.removeUe = function(ue) {
        MyDatas.removeUE(ue);
    }

});

app.controller('CalendarController', function($scope, $timeout, MyDatas) {
    var that = this;

    this.creneaux = [];
    this.isLoad = false;

    var ues = MyDatas.getUes();
    Ni.GetCreneaux(ues, function(list) {
        that.creneaux = list;
        that.isLoad = true;
        $scope.$apply();
    });

    console.log('CalendarController ready.');
})

app.controller('UesSelectorController', function($scope, MyDatas) {
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
