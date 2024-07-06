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
    client.subscribe("domoticz/out/Ext - Lampe cible", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Ext - Lampe cible");
        }
    });
    client.subscribe("domoticz/out/Ext - Lampe exterieure", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Ext - Lampe exterieure");
        }
    });
    client.subscribe("domoticz/out/Ext - Lampe Nord droite", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Ext - Lampe Nord droite");
        }
    });
    client.subscribe("domoticz/out/Ext - Lampe Est gauche", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Ext - Lampe Est gauche");
        }
    });
    client.subscribe("domoticz/out/Ext - Lampe Est droite", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Ext - Lampe Est droite");
        }
    });
    client.subscribe("domoticz/out/Ext - Lampe Nord gauche", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Ext - Lampe Nord gauche");
        }
    });
    client.subscribe("domoticz/out/Ext - Lampe Sud", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Ext - Lampe Sud");
        }
    });


    client.subscribe("domoticz/out/Chaudiere autorisation", (err) => {
        if (!err) {
            console.log("domoticz/out/Chaudiere autorisation");
        }
    });
    client.subscribe("domoticz/out/Chaudiere economie", (err) => {
        if (!err) {
            console.log("domoticz/out/Chaudiere economie");
        }
    });
    client.subscribe("domoticz/out/Chaudiere relai 3", (err) => {
        if (!err) {
            console.log("domoticz/out/Chaudiere relai 3");
        }
    });
    client.subscribe("domoticz/out/Chaudiere relai 4", (err) => {
        if (!err) {
            console.log("domoticz/out/Chaudiere relai 4");
        }
    });


    client.subscribe("zigbeeHome/Relais chaudiere", (err) => {
        if (!err) {
            console.log("zigbeeHome/Relais chaudiere");
        }
    });


    client.subscribe("domoticz/out/Chauffe-eau autorisation", (err) => {
        if (!err) {
            console.log("Subscribe to domoticz/out/Chauffe-eau autorisation");
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
            client.publish("zigbeeHome/Lampe bureau/set", JSON.stringify(cmd));
        }

        if (msg.name === "Chaudiere autorisation") {
            let state = (msg.nvalue === 1) ? "ON" : "OFF";
            let cmd = {
                "state_l1": state
            }
            console.log(cmd);
            client.publish("zigbeeHome/Relais chaudiere/set", JSON.stringify(cmd));
        }
        if (msg.name === "Chaudiere economie") {
            let state = (msg.nvalue === 1) ? "ON" : "OFF";
            let cmd = {
                "state_l2": state
            }
            console.log(cmd);
            client.publish("zigbeeHome/Relais chaudiere/set", JSON.stringify(cmd));
        }
        if (msg.name === "Chaudiere relai 3") {
            let state = (msg.nvalue === 1) ? "ON" : "OFF";
            let cmd = {
                "state_l3": state
            }
            console.log(cmd);
            client.publish("zigbeeHome/Relais chaudiere/set", JSON.stringify(cmd));
        }
        if (msg.name === "Chaudiere relai 4") {
            let state = (msg.nvalue === 1) ? "ON" : "OFF";
            let cmd = {
                "state_l4": state
            }
            console.log(cmd);
            client.publish("zigbeeHome/Relais chaudiere/set", JSON.stringify(cmd));
        }


        if (msg.name === "Chauffe-eau autorisation") {
            let state = (msg.nvalue === 1) ? "ON" : "OFF";
            let cmd = {
                "state": state
            }
            console.log(cmd);
            client.publish("zigbeeHome/Contacteur chauffe-eau/set", JSON.stringify(cmd));
        }


        // Extension
        if (msg.name === "Ext - Lampe bar") {
            let state = (msg.nvalue === 1) ? "ON" : "OFF";
            let cmd = {
                "state": state
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe bar/set", JSON.stringify(cmd));
        }
        if (msg.name === "Ext - Lampe toilette") {
            let state = (msg.nvalue === 1) ? "ON" : "OFF";
            let cmd = {
                "state": state
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe toilette/set", JSON.stringify(cmd));
        }
        if (msg.name === "Ext - Lampe cible") {
            let state = (msg.nvalue === 1) ? "ON" : "OFF";
            let cmd = {
                "state": state
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe cible/set", JSON.stringify(cmd));
        }
        if (msg.name === "Ext - Lampe exterieure") {
            let state = (msg.nvalue === 1) ? "ON" : "OFF";
            let cmd = {
                "state": state
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe exterieure/set", JSON.stringify(cmd));
        }

        if (msg.name === "Ext - Lampe Est droite") {
            let state = (msg.nvalue === 2) ? "ON" : "OFF";
            let brightness = (msg.Level / 100) * 254;
            let cmd = {
                "state": state,
                "brightness": brightness
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe Est droite/set", JSON.stringify(cmd));
        }
        if (msg.name === "Ext - Lampe Est gauche") {
            let state = (msg.nvalue === 2) ? "ON" : "OFF";
            let brightness = (msg.Level / 100) * 254;
            let cmd = {
                "state": state,
                "brightness": brightness
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe Est gauche/set", JSON.stringify(cmd));
        }
        if (msg.name === "Ext - Lampe Nord droite") {
            let state = (msg.nvalue === 2) ? "ON" : "OFF";
            let brightness = (msg.Level / 100) * 254;
            let cmd = {
                "state": state,
                "brightness": brightness
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe Nord droite/set", JSON.stringify(cmd));
        }
        if (msg.name === "Ext - Lampe Nord gauche") {
            let state = (msg.nvalue === 2) ? "ON" : "OFF";
            let brightness = (msg.Level / 100) * 254;
            let cmd = {
                "state": state,
                "brightness": brightness
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe Nord gauche/set", JSON.stringify(cmd));
        }
        if (msg.name === "Ext - Lampe Sud") {
            let state = (msg.nvalue === 2) ? "ON" : "OFF";
            let brightness = (msg.Level / 100) * 254;
            let cmd = {
                "state": state,
                "brightness": brightness
            }
            console.log(cmd);
            client.publish("zigbeeExt/Lampe Sud/set", JSON.stringify(cmd));
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
                if (d.type === "Tongou") {
                    {
                        let state = msg.state === "ON" ? 1 : 0;
                        httpOptions.path = domoticzApiConfig.path + d.domoticzIdx[0] + "&nvalue=" + state + "&rssi=" + convertSignal(msg.linkquality);
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
                    {
                        let power = msg.power;
                        httpOptions.path = domoticzApiConfig.path + d.domoticzIdx[1] + "&nvalue=0&svalue1=" + power + "&rssi=" + convertSignal(msg.linkquality);
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
                    {
                        let energy = msg.energy;
                        httpOptions.path = domoticzApiConfig.path + d.domoticzIdx[1] + "&nvalue=0&svalue1=" + energy + "&rssi=" + convertSignal(msg.linkquality);
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