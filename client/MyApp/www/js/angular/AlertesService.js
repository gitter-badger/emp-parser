app.service('Alertes', function($q) {

    var deferred = $q.defer();

    var factory = function() {
        deferred.resolve();
    };

    var o = new factory();
    o.promise = deferred.promise;
    return o;
});
