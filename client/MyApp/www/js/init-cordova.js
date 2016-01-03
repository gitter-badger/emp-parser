/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var appCordo = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        createTestNotif();
    }

};

function createTestNotif() {
    var now = new Date().getTime(),
        _5_sec_from_now = new Date(now + 20 * 1000);
    var options = {
        id: 1,
        title: 'Scheduled with delay',
        text: 'Test Message 1',
        at: _5_sec_from_now,
        badge: 12
    };
    cordova.plugins.notification.local.schedule(options);
}

function prepareNotifs(creneaux, minutsBeforeNotif) {
    var id = 1;
    var tasks = [];
    for (var i in creneaux) {
        var c = creneaux[i];
        var dateNotif = new Date(c.DateStart - (minutsBeforeNotif * 60 + 1000));
        var options = {
            id: id++,
            title: 'Cours '+c.Summary,
            text: 'En salle '+c.Location,
            at: dateNotif,
            badge: 12
        };
        tasks.push(options);
    }
    cordova.plugins.notification.local.clearAll();
    cordova.plugins.notification.local.schedule(tasks);
}

appCordo.initialize();