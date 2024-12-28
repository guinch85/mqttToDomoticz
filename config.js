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
        topic: "zigbeeHome/Capteur bureau",
        domoticzIdx: 1599,
        type: "Temp+Humidity"
    },
    {
        name: "Capteur chambre 1",
        topic: "zigbeeHome/Capteur chambre 1",
        domoticzIdx: 1605,
        type: "Temp+Humidity"
    },
    {
        name: "Capteur chambre 2",
        topic: "zigbeeHome/Capteur chambre 2",
        domoticzIdx: 1606,
        type: "Temp+Humidity"
    },
    {
        name: "Capteur cuisine",
        topic: "zigbeeHome/Capteur cuisine",
        domoticzIdx: 1602,
        type: "Temp+Humidity"
    },
    {
        name: "Capteur extérieur",
        topic: "zigbeeHome/Capteur extérieur",
        domoticzIdx: 1636,
        type: "Temp+Humidity"
    },
    {
        name: "Capteur salle de bain",
        topic: "zigbeeHome/Capteur salle de bain",
        domoticzIdx: 1603,
        type: "Temp+Humidity"
    },
    {
        name: "Capteur salon",
        topic: "zigbeeHome/Capteur salon",
        domoticzIdx: 1598,
        type: "Temp+Humidity"
    },
    {
        name: "Interrupteur bureau",
        topic: "zigbeeHome/Interrupteur bureau",
        domoticzIdx: 1601,
        type: "Text"
    },
    {
        name: "Contacteur chauffe-eau",
        topic: "zigbeeHome/Contacteur chauffe-eau",
        domoticzIdx: [1631,1630,1632],
        type: "Tongou"
    },

    // Extension
    {
        name: "Ext - Capteur extension",
        topic: "zigbeeExt/Capteur extension",
        domoticzIdx: 1607,
        type: "Temp+Humidity"
    },
    {
        name: "Ext - Interrupteur bar",
        topic: "zigbeeExt/Interrupteur bar",
        domoticzIdx: 1608,
        type: "Text"
    },
    {
        name: "Ext - Interrupteur toilette",
        topic: "zigbeeExt/Interrupteur toilette",
        domoticzIdx: 1609,
        type: "Text"
    },

]

module.exports = {
    domoticzApiConfig,
    mqttConfig,
    devices
};
