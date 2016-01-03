app.service('MyCreneaux', function($q,MyDatas, Fds) {

    console.log('Creating MyCreneaux service...');

    var deferred = $q.defer();

    var factory = function() {
        var that = this;

        this.myCreneaux = [];

        this.GetCreneaux = function(callback) {
            this.syncCreneaux();
            callback(this.myCreneaux);
        };

        this.syncCreneaux = function() {
            console.log("MyCreneaux:: syncCreneaux()");
            var mesUes = MyDatas.GetUes();
            Fds.GetCreneaux(mesUes, function(out) {
                that.myCreneaux = out;
            });
        };

        deferred.resolve();
    };

    var o = new factory();
    o.promise = deferred.promise;
    return o;
});
