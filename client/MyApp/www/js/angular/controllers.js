
app.controller('MainController', function($scope, $timeout, Loader) {
    console.log('Instance MainController.');
    var that = this;
    this.IsLoading = true;

    Loader.promise.then(function() {
        console.log('PageController:: Init Done!');
        that.IsLoading = false;
    });
});

app.controller('PageController', function($scope, $location, $window, MyDatas) {
    $scope.goPage = function(page) {
        $location.path(page);
        $window.scrollTo(0,0);
    };

    $scope.$on('$routeChangeSuccess', function(next, current) {
       initJquery();
     });
});

app.controller('UEsController', function($scope, $timeout, MyDatas) {
    var that = this;

    that.contains = function(ue) {
        return MyDatas.ContainUE(ue);
    }

    that.getUes = function() {
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
    this.currentCreneau = {};

    var ues = MyDatas.GetUes();
    this.haveUe = (ues.length > 0);

    Fds.GetCreneaux(ues, function(list) {
        that.creneaux = list;
        that.isLoad = true;
        that.currentCreneau = that.getCurrent();
        $scope.$apply();
    });

    // Retourne le prochain cours, jusqu'a ce qu'il expire
    this.getCurrent = function() {
        var todayTimestamp = Math.floor(new Date().getTime() / 1000);
        for (var i in that.creneaux) {
            var c = that.creneaux[i];
            return c;
            if (c.DateStart < todayTimestamp && c.DateEnd > todayTimestamp) {
                return c;
            }
        }
        return {};
    }

    console.log('CalendarController ready.');
});

app.controller('UesSelectorController', function($scope, MyDatas, Fds) {
    var that = this;
    this.allUes = [];
    this.limitUE = 10;
    this.isLoad = false;

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
