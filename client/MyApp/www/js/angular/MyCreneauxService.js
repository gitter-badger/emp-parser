app.service('MyCreneaux', function($q,MyDatas, Fds, Storage, UserSettings) {

    console.log('Creating MyCreneaux service...');

    var deferred = $q.defer();

    var factory = function() {
        var that = this;

        this.myCreneaux = [];
        this.syncInProgress = false;

        this.GetCreneaux = function(callback) {
            if (UserSettings.GetSetting('realTimeData')) {
                this.syncCreneaux(function(out) {
                    callback(out);
                });
            } else {
                this.syncCreneaux(function() {});
                callback(this.myCreneaux);
            }
        };

        this.syncCreneaux = function(callback) {
            if (!this.syncInProgress) {
                console.log("MyCreneaux:: syncCreneaux() ...");
                that.syncInProgress = true;
                var mesUes = MyDatas.GetUes();
                Fds.GetCreneaux(mesUes, function(out) {
                    that.myCreneaux = out;
                    Storage.updateDb('mycreneaux', that.myCreneaux);
                    that.syncInProgress = false;
                    console.log("MyCreneaux:: syncCreneaux() done");
                    callback(out);
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
