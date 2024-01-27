const {InfluxDB, Point} = require('@influxdata/influxdb-client')
require('dotenv').config();
const mqtt = require("mqtt");



// Change this to point to your MQTT broker or DNS name
var mqttClient;
// const mqttHost = "499e5fe7ee1042a2a112fc8866df8c1f.s2.eu.hivemq.cloud";
// const protocol = "mqtt";
// const port = "8883";


function connectToDB(){

 try
    {

        const token = process.env.INFLUXDB_CONN_TOKEN
        const url = process.env.INFLUXDB_URL
        const client = new InfluxDB({url, token});
        console.log("connected to InfluxDB");
        return client;
    }catch(e){
        console.error(e);
    }
    
}




function connectToBroker() {
    const clientId = process.env.BROKER_USERNAME
    // const hostURL = `${protocol}://${mqttHost}:${port}`;
    var options = {
        host: process.env.BROKER_HOST,
        port: process.env.BROKER_PORT,
        protocol: process.env.BROKER_PROTOCOL,
        username: process.env.BROKER_USERNAME,
        password: process.env.BROKER_PASSWORD,

    }

    mqttClient = mqtt.connect(options);
    mqttClient.on("error", (err) => {
        console.log("Error: ", err);
        mqttClient.end();
    });

    mqttClient.on("reconnect", () => {
        console.log("Reconnecting...");
    });

    mqttClient.on("connect", () => {
        console.log("Client connected:" + clientId);
    });
    mqttClient.on("message", (topic, message, packet) => {
        console.log(`Topic - ${topic} \nPacket ${packet} \nmessage : ${message}`);
        const frames = message.toString();
        console.log(frames);
        const frameData = frames.split(",");
    
        let point = new Point("Machine").tag("sen_id" , frameData[1]).tag("location" , frameData[2]).floatField("value" , frameData[3]);

        writeClient.writePoint(point);
        writeClient.flush();
        console.log("Data written");
    });
}

function subscribeToTopic(topic) {
    console.log(`Subscribing to Topic: ${topic}`);
    mqttClient.subscribe(topic, { qos: 0 });
    
}

const db = connectToDB();

let org = process.env.INFLUXDB_ORG;
let bucket = process.env.INFLUXDB_TEST_BUCKET;
writeClient = db.getWriteApi(org, bucket, 'ns')

connectToBroker();
subscribeToTopic("sensor");