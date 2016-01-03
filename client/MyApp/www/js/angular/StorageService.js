app.service('StorageService', function($q, $http) {

    var factory = function() {

        this.db = new PouchDB('edt');

        this.updateDb = function(id, json) {
            var that = this;
            var doc = this.buildData(id, json);
            return this.db.get(doc._id).then(function (origDoc) {
                doc._rev = origDoc._rev;
                return that.db.put(doc);
            }).catch(function (err) {
                if (err.status === 409) {
                    return that.updateDb(id, json);
                } else { // new doc
                    return that.db.put(doc);
                }
            });
        };

        this.buildData = function(id, json) {
            return {
                _id: id,
                list: json,
                rev: new Date()
            };
        };

        this.get = function(id) {
            return this.db.get('myues');
        };

    };

    var o = new factory();
    return o;
});
