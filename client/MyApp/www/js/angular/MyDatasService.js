app.service('MyDatas', function($q, $http, StorageService) {

    console.log('Creating MyDatas service...');

    var deferred = $q.defer();

    var that = function() {

        this.myUES = {};

        //this.db.destroy();

        this.AddUe = function(ue) {
            this.myUES[ue.Name] = ue;
            console.log("MyDatas:: UE added");
            StorageService.updateDb('myues', this.myUES);
        };

        this.GetUes = function() {
            var list = [];
            for (var i in this.myUES) {
                list.push(this.myUES[i]);
            }
            return list;
        };

        this.RemoveUE = function(ue) {
            console.log("MyDatas:: remove "+ue.Name);
            delete this.myUES[ue.Name];
            StorageService.updateDb('myues', this.myUES);
        };

        this.ContainUE = function(ue) {
            return ue.Name in this.myUES;
        };

        // Executé à l'initialisation de l'appli
        this.loadMyUEs = function() {
            console.log("MyDatas:: Chargement de ses UEs...");
            var that = this;
            StorageService.get('myues').then(function(doc) {
                that.myUES = doc.list;
            }).then(function(response) {
                console.log("MyDatas:: UEs chargées");
                deferred.resolve();
            }).catch(function (err) {
                console.log("Err during loadMyUEs :");
                console.log(err);
                deferred.resolve();
            });
        };

    };

    var o = new that();
    o.loadMyUEs();
    o.promise = deferred.promise;

    console.log('MyDatas Instancied.');
    return o;

});
