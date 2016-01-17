if (device === undefined) {
    var device = {
        platform: 'browser'
    };
}

var appCordo = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        cordova.plugins.notification.local.on("trigger", function(notification) {
            console.log("trigger");
            if (device.platform == 'browser') {
                alert("triggered: " + notification.title+" "+notification.text);
            }
        });

        cordoInterface.createTestNotif();
    }

};

var cordoInterface = {
    createTestNotif: function() {
        var now = new Date().getTime(),
            _5_sec_from_now = new Date(now + 20 * 1000);
        var options = {
            id: 1,
            title: 'Scheduled with delay',
            text: 'Test Message 1' + _5_sec_from_now,
            at: _5_sec_from_now,
            badge: 12
        };
        cordova.plugins.notification.local.schedule(options);
    },
    prepareNotifs: function(creneaux, minutsBeforeNotif) {
        var id = 2;
        var tasks = [];
        for (var i in creneaux) {
            var c = creneaux[i];
            var dateNotif = new Date((c.DateStart - (minutsBeforeNotif * 60)) * 1000);
            var options = {
                id: id++,
                title: 'Cours '+c.Summary,
                text: 'En salle '+c.Location,
                at: dateNotif,
                badge: 12
            };
            tasks.push(options);
        }
        this.clearNotif();
        if (device.platform != 'browser') {
            cordova.plugins.notification.local.schedule(tasks);
        }
        console.log(tasks.length+" alertes programmées");
    },
    clearNotif: function() {
        console.log("alertes désactivées");
        if (device.platform != 'browser') {
            cordova.plugins.notification.local.clearAll();
        }

    },
    openAppLocation: function(numBatiment) {
        var params = [{"nomBatiment":numBatiment}];
        navigator.startApp.start("malmassari.pierre.umaps", params, function(message) {
            // Materialize.toast(message);
        },
        function(error) {
            Materialize.toast(error);
        });
    },
    hasAppLocation: function(callback) {
        if (device.platform == 'browser') {
            callback(false);
            return;
        }

        if (navigator.startApp === undefined ||  navigator.startApp === null) {
            Materialize.toast("Error : navigator.startApp undefined");
            callback(false);
            return;
        }

        navigator.startApp.check("malmassari.pierre.umaps", function(message) {
            Materialize.toast("app exists: ");
            // Materialize.toast(message.versionName);
            // Materialize.toast(message.packageName);
            // Materialize.toast(message.versionCode);
            // Materialize.toast(message.applicationInfo);
            callback(true);
        },
        function(error) {
            Materialize.toast(error); // TODO retirer
            callback(false);
        });
    }
};


appCordo.initialize();
