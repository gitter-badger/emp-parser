app.service('Loader', function($q, $http, $timeout, Fds, MyDatas) {

    console.log('Creating Loader service...');

    var deferred = $q.defer();
    var fakeTimeSeconds = 3;

    var that = function() {

        Fds.promise.then(function() {
            MyDatas.promise.then(function() {
                $timeout(function() {
                    deferred.resolve();
                }, fakeTimeSeconds * 1000);
            });
        });
    };

    var o = new that();
    o.promise = deferred.promise;
    return o;

});
