var MyDatas;
var Ni;

function MyDatas() {
    this.myUES = {};

    this.addUe = function(ue) {
        this.myUES[ue.Name] = ue;
        console.log("UE added");
    }

    this.getUes = function() {
        var list = [];
        for (var i in this.myUES) {
            list.push(this.myUES[i]);
        }
        return list;
    }

    this.containUE = function(ue) {
        return ue.Name in this.myUES;
    }

    this.loadMyUEs = function() {
        console.log("MyDatas:: Chargement de ses UEs...");
        //this.myUES.push({Name: 'HMIN306', Description: 'M2 - AIGLE - Architectures et Ingénierie du logiciel et du WebHMIN306 - Evolution et restructuration'});
    };
}

function initMyDatas() {
    MyDatas = new MyDatas();
    MyDatas.loadMyUEs();
}

function NetworkInterface() {

    this.baseUrl;

    this.GetAllUes = function(callback) {
        var query = this.baseUrl + 'list-ue';
        $.getJSON(query, function(data) {
            var ues = data;
            console.log('NetworkInterface:: Liste des UEs reçus : '+ues);
            callback(ues);
        });
    };

    this.Init = function(baseUrl) {
        this.baseUrl = baseUrl;
    };

}

$(function() {
    initMyDatas();
    Ni = new NetworkInterface();
    Ni.Init('http://192.168.1.92:2000/');
});
