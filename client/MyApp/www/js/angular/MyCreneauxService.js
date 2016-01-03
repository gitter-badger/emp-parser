app.service('MyCreneaux', function($q,MyDatas, Fds) {

    console.log('Creating MyCreneaux service...');

    var deferred = $q.defer();

    var factory = function() {
        this.GetCreneaux = function(callback) {
            var mesUes = MyDatas.GetUes();
            return Fds.GetCreneaux(mesUes, callback);
        };

        deferred.resolve();
    };

    var o = new factory();
    o.promise = deferred.promise;
    return o;
});
