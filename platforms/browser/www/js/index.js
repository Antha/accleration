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

function getAcceleration() {
   navigator.accelerometer.getCurrentAcceleration(
      accelerometerSuccess, accelerometerError);

   function accelerometerSuccess(acceleration) {
      $("#val_x").html(acceleration.x);  
      $("#val_y").html(acceleration.y);  
      $("#val_z").html(acceleration.z); 

      if (typeof previousAcceleration == "undefined" || previousAcceleration == null) {
            previousAcceleration = acceleration;
      }

      var accelerationDelta = {
            x: acceleration.x - previousAcceleration.x,
            y: acceleration.y - previousAcceleration.y,
            z: acceleration.z - previousAcceleration.z
        };
      
      var magnitude = Math.sqrt(
            Math.pow(accelerationDelta.x, 2) +
            Math.pow(accelerationDelta.y, 2) +
            Math.pow(accelerationDelta.z, 2)
        ); 

      previousAcceleration = acceleration;

      $("#val_mag").html(magnitude); 

      if(magnitude > 1){
        var audio = new Audio('fire.wav');
        audio.play();
        $("#alarm").html("<img src='alarm.gif' width='100'/>")
      }else{
        $("#alarm").html("");
      }
   };

   function accelerometerError() {
      alert('onError!');
   };
}

function watchAcceleration() {
   var accelerometerOptions = {
      frequency: 3000
   }
   var watchID = navigator.accelerometer.watchAcceleration(
      accelerometerSuccess, accelerometerError, accelerometerOptions);

   function accelerometerSuccess(acceleration) {
      alert('Acceleration X: ' + acceleration.x + '\n' +
         'Acceleration Y: ' + acceleration.y + '\n' +
         'Acceleration Z: ' + acceleration.z + '\n' +
         'Timestamp: '      + acceleration.timestamp + '\n');

      setTimeout(function() {
         navigator.accelerometer.clearWatch(watchID);
      }, 10000);
   };

   function accelerometerError() {
      alert('onError!');
   };
    
}

var app = {
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
        //document.getElementById("getAcceleration").addEventListener("click", getAcceleration);
        //document.getElementById("watchAcceleration").addEventListener("click", watchAcceleration);

        setInterval(getAcceleration,500);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
