app.service('Fds', function($q, $http, $timeout) {

    console.log('Creating Fds service...');

    var deferred = $q.defer();

    var that = function() {

        this.baseUrl;

        this.GetAllUes = function(callback) {
            var query = this.baseUrl + 'list-ue';
            $.getJSON(query, function(data) {
                var ues = data;
                //console.log('Fds:: Liste des UEs reçus : '+ues);
                callback(ues);
            });
        };

        this.GetCreneaux = function(ues, callback) {
            var linearList = '0';
            for (var i in ues) {
                linearList += ues[i].Name + ',';
            }
            linearList += "0";

            var query = this.baseUrl + 'creneaux?list='+linearList;
            console.log("query: "+query)
            $.getJSON(query, function(data) {
                var creneaux = (data != null) ? data : [];
                console.log('Fds:: Liste des creneaux reçus : ');
                console.log(data);

                // Réglage GMT-1
                for (var i in creneaux) {
                    creneaux[i].DateStart -= 3600;
                    creneaux[i].DateEnd -= 3600;
                }

                creneaux.sort(predicatBy('DateStart'));

                $timeout(function() {
                    callback(creneaux);
                }, 500);
            });
        }

        this.Init = function(baseUrl) {
            this.baseUrl = baseUrl;

            // ping
            $.get(this.baseUrl, function(data) {
                deferred.resolve();
            });
        };

    }

    var o = new that();
    o.Init('http://vps.doelia.fr:2001/');
    o.promise = deferred.promise;
    return o;

});
