
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

app.controller('SettingsController', function(UserSettings) {
    this.interface = UserSettings;

    this.OnSet = function() {
        UserSettings.UpdateSettings();
    };
});

app.controller('UEsController', function($scope, $timeout, MyDatas) {
    var that = this;

    that.contains = function(ue) {
        return MyDatas.ContainUE(ue);
    };

    that.getUes = function() {
        return MyDatas.GetUes();
    };

    that.addUe = function(ue) {
        MyDatas.AddUe(ue);
        Materialize.toast('UE '+ue.Name+" ajoutée", 2000);
    };

    that.removeUe = function(ue) {
        MyDatas.RemoveUE(ue);
    };

});

app.controller('CalendarController', function($scope, $timeout, MyDatas, MyCreneaux) {
    var that = this;
    this.creneaux = [];
    this.isLoad = false;
    this.currentCreneau = null;

    var ues = MyDatas.GetUes();
    this.haveUe = (ues.length > 0);

    // Retourne le prochain cours
    this.getCurrent = function() {
        for (var i in that.creneaux) {
            return that.creneaux[i];
        }
        return null;
    };

    MyCreneaux.GetCreneaux(function(list) {
        that.creneaux = list;
        that.isLoad = true;
        that.currentCreneau = that.getCurrent();
        //$scope.$apply();
    });

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
        if (search && search.Description !== '') {
            return this.allUes;
        } else {
            return [];
        }
    };

});
