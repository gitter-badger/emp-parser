app.service('MyDatas', function($q, $http) {

    console.log('Creating MyDatas service...');

    var deferred = $q.defer();

    var that = function() {

        this.myUES = {};

        this.db = new PouchDB('edt');
        //this.db.destroy();

        this.AddUe = function(ue) {
            this.myUES[ue.Name] = ue;
            console.log("MyDatas:: UE added");
            this.updateDb();
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
            this.updateDb();
        };

        this.ContainUE = function(ue) {
            return ue.Name in this.myUES;
        };

        // Executé à l'initialisation de l'appli
        this.loadMyUEs = function() {
            console.log("MyDatas:: Chargement de ses UEs...");
            var that = this;
            this.db.get('myues').then(function(doc) {
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

        this.updateDb = function() {
            var that = this;
            var doc = this.buildData(this.myUES);
            return this.db.get(doc._id).then(function (origDoc) {
                doc._rev = origDoc._rev;
                return that.db.put(doc);
            }).catch(function (err) {
                if (err.status === 409) {
                    return that.updateDb();
                } else { // new doc
                    return that.db.put(doc);
                }
            });
        };

        this.buildData = function(ues) {
            return {
                _id: 'myues',
                list: ues,
                rev: new Date()
            };
        };
    };

    var o = new that();
    o.loadMyUEs();
    o.promise = deferred.promise;

    console.log('MyDatas Instancied.');
    return o;

});
