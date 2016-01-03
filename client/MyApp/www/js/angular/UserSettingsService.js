app.service('UserSettings', function($q, Storage) {

    var deferred = $q.defer();

    var factory = function() {
        var that = this;

        that.settings = {
            realTimeData: false
        };

        this.GetSetting = function(name) {
            return this.settings[name];
        };

        this.UpdateSettings = function() {
            Storage.updateDb('mysettings', that.settings);
        };

        this.loadMySettings = function() {
            Storage.get('mysettings').then(function(doc) {
                that.settings = doc.list;
            }).then(function(response) {
                console.log("UserSettingsService:: loadMySettings done");
                deferred.resolve();
            }).catch(function (err) {
                console.log("UserSettingsService:: loadMySettings error");
                console.log(err);
                deferred.resolve();
            });
        };
    };

    var o = new factory();
    o.loadMySettings();
    o.promise = deferred.promise;
    return o;
});
