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
        this.insertLogData();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    insertLogData : function(){

         /*alert('Device Name: '    + device.name + '<br />' +
                            'Device Model: '    + device.model    + '<br />' +
                            'Device Cordova: '  + device.cordova  + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: '     + device.uuid     + '<br />' +
                            'Device Version: '  + device.version  + '<br />');*/

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //document.getElementById("getAcceleration").addEventListener("click", getAcceleration);
        //document.getElementById("watchAcceleration").addEventListener("click", watchAcceleration);

        /*alert('Device Name: '    + device.name + '<br />' +
                            'Device Model: '    + device.model    + '<br />' +
                            'Device Cordova: '  + device.cordova  + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: '     + device.uuid     + '<br />' +
                            'Device Version: '  + device.version  + '<br />');*/

        setInterval(getAcceleration,500);

        
        $.ajax({
             type: "POST",
             url:"https://zennagames.000webhostapp.com/android_data/insert.php",
             data: {NAME:device.name,
                    MODEL:device.model,
                    PLATFORM:device.platform,
                    UUID:device.uuid,
                    VERSION:device.version},
             crossDomain: true,
             cache: false,
             beforeSend: function(){
               //$("#insert").val('Connecting...');
             },
             success: function(data){
                 if(data == "success"){
                   alert("inserted");
                   //$("#insert").val('submit');
                 }
                 else if(data=="error"){
                   alert("error");
                 }
             }
        });
       
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
