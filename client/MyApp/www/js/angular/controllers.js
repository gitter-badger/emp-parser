
app.controller('MainController', function($scope, $timeout, Loader) {
    console.log('Instance MainController.');
    var that = this;
    this.IsLoading = true;

    Loader.promise.then(function() {
        console.log('PageController:: Init Done!');
        that.IsLoading = false;
    });
});

app.controller('PageController', function($scope, $location, MyDatas) {
    $scope.goPage = function(page) {
        $location.path(page);
    };
});

app.controller('UEsController', function($scope, $timeout, MyDatas) {

    var that = this;

    that.contains = function(ue) {
        return MyDatas.ContainUE(ue);
    }

    that.getUes = function() {
        console.log('debug : getUes');
        return MyDatas.GetUes();
    }

    that.addUe = function(ue) {
        MyDatas.AddUe(ue);
    }

    that.removeUe = function(ue) {
        MyDatas.RemoveUE(ue);
    }

});

app.controller('CalendarController', function($scope, $timeout, MyDatas, Fds) {
    var that = this;

    this.creneaux = [];
    this.isLoad = false;

    var ues = MyDatas.GetUes();
    Fds.GetCreneaux(ues, function(list) {
        that.creneaux = list;
        that.isLoad = true;
        $scope.$apply();
    });

    console.log('CalendarController ready.');
});

app.controller('UesSelectorController', function($scope, MyDatas, Fds) {
    this.allUes = [];
    this.limitUE = 10;
    this.isLoad = false;
    var that = this;

    console.log("UEsController:: loadUes()");
    Fds.GetAllUes(function(list) {
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
