app.service('Fds', function($q, $http, $timeout) {

    console.log('Creating Fds service...');

    var deferred = $q.defer();

    var that = function() {

        this.baseUrl = "";

        this.GetAllUes = function(callback) {
            var query = this.baseUrl + 'list-ue';
            console.log("Query GetAllUES:"+query);
            $.getJSON(query, function(data) {
                var ues = data;
                $timeout(function() {
                    callback(ues);
                }, 0);
            })
            .fail(function(jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
            });

            $.get(query, function(data) {
                console.log("OK");
            })
            .fail(function(jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Request 2 Failed: " + err );
            });
        };

        this.GetCreneaux = function(ues, callback) {
            var linearList = '0,';
            for (var i in ues) {
                linearList += ues[i].Name + ',';
            }
            linearList += "0";

            var query = this.baseUrl + 'creneaux?list='+linearList;
            console.log("query: "+query);
            $.getJSON(query, function(data) {
                var creneaux = (data !== null) ? data : [];
                console.log('Fds:: Liste des creneaux reçus : ');
                console.log(data);

                creneaux.sort(predicatBy('DateStart'));

                $timeout(function() {
                    callback(creneaux);
                }, 0);
            });
        };

        this.Init = function(baseUrl) {
            this.baseUrl = baseUrl;
            deferred.resolve();
        };

    };

    var o = new that();
    o.Init('http://edt.doelia.fr:2010/');
    o.promise = deferred.promise;
    return o;

});
