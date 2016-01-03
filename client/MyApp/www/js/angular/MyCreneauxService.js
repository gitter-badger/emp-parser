app.service('MyCreneaux', function($q,MyDatas, Fds, Storage, UserSettings) {

    console.log('Creating MyCreneaux service...');

    var deferred = $q.defer();

    var factory = function() {
        var that = this;

        this.myCreneaux = [];
        this.syncInProgress = false;

        this.GetCreneaux = function(callback) {
            if (UserSettings.settings.realTimeData || this.myCreneaux.length === 0) {
                this.syncCreneaux(function() {
                    that.cleanCreneaux();
                    callback(that.myCreneaux);
                });
            } else {
                this.syncCreneaux(function() {});
                that.cleanCreneaux();
                callback(that.myCreneaux);
            }
        };

        // Retire les creneaux passés en temps
        this.cleanCreneaux = function() {
            var todayTimestamp = Math.floor(new Date().getTime() / 1000);
            this.myCreneaux = $.grep(this.myCreneaux, function(c) {
                return c.DateEnd > todayTimestamp;
            });
            Storage.updateDb('mycreneaux', that.myCreneaux);
        };

        // Syncho avec le serveur, mise en localstorge et en RAM + appel du callback
        this.syncCreneaux = function(callback) {
            if (!this.syncInProgress) {
                console.log("MyCreneaux:: syncCreneaux() ...");
                that.syncInProgress = true;
                var mesUes = MyDatas.GetUes();
                Fds.GetCreneaux(mesUes, function(out) {
                    that.myCreneaux = out;
                    Storage.updateDb('mycreneaux', that.myCreneaux);
                    that.syncInProgress = false;
                    prepareNotifs(that.myCreneaux, UserSettings.settings.timeAlertes);
                    console.log("MyCreneaux:: syncCreneaux() done");
                    callback();
                });
            }
        };

        this.loadCreanauxFromLocalStorage = function() {
            Storage.get('mycreneaux').then(function(doc) {
                that.myCreneaux = doc.list;
            }).then(function(response) {
                console.log("MyCreneaux:: loadCreanauxFromLocalStorage done");
                deferred.resolve();
            }).catch(function (err) {
                console.log("MyCreneaux:: loadCreanauxFromLocalStorage error");
                console.log(err);
                deferred.resolve();
            });
        };
    };

    var o = new factory();
    o.loadCreanauxFromLocalStorage();
    o.promise = deferred.promise;
    return o;
});
