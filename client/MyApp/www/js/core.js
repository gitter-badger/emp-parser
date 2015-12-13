
function MyDatas() {
    this.myUES = {};

    this.db = new PouchDB('edta');
    //this.db.destroy();

    this.addUe = function(ue) {
        this.myUES[ue.Name] = ue;
        console.log("UE added");
        this.updateDb();
    }

    this.getUes = function() {
        var list = [];
        for (var i in this.myUES) {
            list.push(this.myUES[i]);
        }
        return list;
    }

    this.removeUE = function(ue) {
        console.log("MyDatas:: remove "+ue.Name);
        delete this.myUES[ue.Name];
        this.updateDb();
    }

    this.containUE = function(ue) {
        return ue.Name in this.myUES;
    }

    this.loadMyUEs = function(callback) {
        console.log("MyDatas:: Chargement de ses UEs...");
        var that = this;
        this.db.get('myues').then(function(doc) {
          that.myUES = doc.list;
        }).then(function(response) {
            callback();
        }).catch(function (err) {
          console.log(err);
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
    }

    this.buildData = function(ues) {
        return {
          _id: 'myues',
          list: ues,
          rev: new Date()
        };
    }
}

function NetworkInterface() {

    this.baseUrl;

    this.GetAllUes = function(callback) {
        var query = this.baseUrl + 'list-ue';
        $.getJSON(query, function(data) {
            var ues = data;
            //console.log('NetworkInterface:: Liste des UEs reçus : '+ues);
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
            var creneaux = data;
            console.log('NetworkInterface:: Liste des creneaux reçus : '+creneaux);
            callback(creneaux);
        });
    }

    this.Init = function(baseUrl) {
        this.baseUrl = baseUrl;
    };

}
