const http = require('http');
const devices = require('./config').devices;
const domoticzApiConfig = require("./config").domoticzApiConfig;

let httpOptions = {
    host: domoticzApiConfig.host,
    port: domoticzApiConfig.port,
    path: ""
};

let convertSignal = function (zigbeeSignal) {
    let value = (zigbeeSignal / 255) * 11;
    return Math.trunc(value);
}

const mqtt = require("mqtt");
const mqttConfig = require("./config").mqttConfig;
const client = mqtt.connect("mqtt://" + mqttConfig.host + ":" + mqttConfig.port);

client.on("connect", () => {
    for (let d of devices) {
        client.subscribe(d.topic, (err) => {
            if (!err) {
                console.log("Subscribe to " + d.name);
            }
        });
    }

    client.subscribe("domoticz/out/Lampe bureau", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Lampe bureau");
        }
    });
    client.subscribe("domoticz/out/Capteur chambre 1", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Capteur chambre 1");
        }
    });
    client.subscribe("domoticz/out/Ext - Lampe bar", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Ext - Lampe bar");
        }
    });
    client.subscribe("domoticz/out/Ext - Lampe toilette", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Ext - Lampe toilette");
        }
    });
});

client.on("message", (topic, message) => {
    console.log(topic);
    if (topic.startsWith("domoticz/out/")) {
        // console.log(message);
        let msg = JSON.parse(message);
        // console.log(msg);

        if (msg.name === "Lampe bureau") {
            let state = (msg.nvalue === 2) ? "ON" : "OFF";
            let brightness = (msg.Level / 100) * 254;
            let cmd = {
                "state": state,
                "brightness": brightness
            }
            console.log(cmd);
            client.publish("zigbee2mqtt/Lampe bureau/set", JSON.stringify(cmd));
        }

        if (msg.name === "Capteur chambre 1") {
            let temp = Math.trunc(parseFloat(msg.svalue1) * 100);

            let cmd = {
                "external_measured_room_sensor": temp
            }
            console.log(cmd);
            client.publish("zigbee2mqtt/Vanne chambre 1/set", JSON.stringify(cmd));
        }


        if (msg.name === "Ext - Lampe bar") {
            let state = (msg.nvalue === 2) ? "ON" : "OFF";
            let cmd = {
                "state": state
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe bar/set", JSON.stringify(cmd));
        }
        if (msg.name === "Ext - Lampe toilette") {
            let state = (msg.nvalue === 2) ? "ON" : "OFF";
            let cmd = {
                "state": state
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe toilette/set", JSON.stringify(cmd));
        }

    } else {
        for (let d of devices) {
            if (topic === d.topic) {
                console.log("Received data from " + d.name);
                let msg = JSON.parse(message);
                console.log(msg);
                let requestReady = false;
                if (d.type === "Temp+Humidity") {
                    httpOptions.path = domoticzApiConfig.path + d.domoticzIdx + "&nvalue=0&svalue=" + msg.temperature + ";" + msg.humidity + ";0&rssi=" + convertSignal(msg.linkquality) + "&battery=" + msg.battery;
                    // console.log(httpOptions.path);
                    requestReady = true;
                }
                if (d.type === "Text") {
                    httpOptions.path = domoticzApiConfig.path + d.domoticzIdx + "&nvalue=0&svalue=" + msg.action + "&rssi=" + convertSignal(msg.linkquality) + "&battery=" + msg.battery;
                    // console.log(httpOptions.path);
                    requestReady = true;
                }

                if (requestReady) {
                    let req = http.request(httpOptions);
                    req.on('error', function (e) {
                        console.error("Request failed");
                        console.error(e);
                    });
                    req.on('timeout', function () {
                        console.log("Request timeout");
                    });
                    req.end();
                }
            }
        }
    }


    // client.end();
});