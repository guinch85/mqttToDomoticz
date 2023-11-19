let mqttConfig = {
    host: "192.168.85.6",
    port: 1883
}
let domoticzApiConfig = {
    host: "192.168.85.6",
    port: 8080,
    path: "/json.htm?type=command&param=udevice&idx="
}

let devices = [
    {
        name: "Capteur bureau",
        topic: "zigbee2mqtt/Capteur bureau",
        domoticzIdx: 1599,
        type: "Temp+Humidity"
    },
    {
        name: "Capteur cuisine",
        topic: "zigbee2mqtt/Capteur cuisine",
        domoticzIdx: 1602,
        type: "Temp+Humidity"
    },
    {
        name: "Capteur salle de bain",
        topic: "zigbee2mqtt/Capteur salle de bain",
        domoticzIdx: 1603,
        type: "Temp+Humidity"
    },
    {
        name: "Capteur salon",
        topic: "zigbee2mqtt/Capteur salon",
        domoticzIdx: 1598,
        type: "Temp+Humidity"
    },
    {
        name: "Interrupteur bureau",
        topic: "zigbee2mqtt/Interrupteur bureau",
        domoticzIdx: 1601,
        type: "Text"
    }
]

module.exports = {
    domoticzApiConfig,
    mqttConfig,
    devices
};
