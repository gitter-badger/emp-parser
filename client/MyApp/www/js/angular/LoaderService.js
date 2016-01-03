app.service('Loader', function($q, $http, $timeout, Fds, MyDatas, MyCreneaux) {

    console.log('Creating Loader service...');

    var deferred = $q.defer();
    var fakeTimeSeconds = 0;

    var that = function() {

        Fds.promise.then(function() {
            MyDatas.promise.then(function() {
                MyCreneaux.promise.then(function() {
                    $timeout(function() {
                        deferred.resolve();
                    }, fakeTimeSeconds * 1000);
                });
            });
        });
    };

    var o = new that();
    o.promise = deferred.promise;
    return o;

});
