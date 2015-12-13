app.service('Loader', function($q, $http, $timeout, Fds, MyDatas) {

    console.log('Creating Loader service...');

    var deferred = $q.defer();

    var that = function() {

        $timeout(function() {
            deferred.resolve();
        }, 1000);

    }

    var o = new that();
    o.promise = deferred.promise;
    return o;

});
