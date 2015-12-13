app.service('Loader', function($q, $http, $timeout, Fds, MyDatas) {

    console.log('Creating Loader service...');

    var deferred = $q.defer();

    var that = function() {
        Fds.promise.then(function() {
            MyDatas.promise.then(function() {
                deferred.resolve();
            });
        });
    }

    var o = new that();
    o.promise = deferred.promise;
    return o;

});
