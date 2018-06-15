var canvas;
var textos;
var data;
var temperatura_0;
var umidade_1 ;
var gotas;
var logo;

var girar = 0.0;

// Create a client instance
//client = new Paho.MQTT.Client("177.99.211.82", 30076, "clientId");
client = new Paho.MQTT.Client("iot.eclipse.org", 443, "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var options = {
  useSSL: true,
  timeout: 3,
  onSuccess: onConnect
}

// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
  client.subscribe("ilab/devices/data/#");
  //console.log("ugikgkigk")
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  message = JSON.parse(message.payloadString);
  //console.log(message)
  if(Object.getOwnPropertyNames (message)[0] == "temperature"){
    temperatura_0 = message.temperature;   
    info_temperatura.setAttribute('value', "" + temperatura_0 + "C");    
  }else if(Object.getOwnPropertyNames (message)[0] == "humidity"){
    umidade_1 = message.humidity;
    console.log(umidade_1)
    info_umidade.setAttribute('value', "" + umidade_1 +"%");
  }
}



function setup() {

canvas = createCanvas(windowWidth,windowHeight);
canvas.position(0, 0);

canvas.parent("#p5js");

logo = loadImage("../addons/LOGO_DBLAB.png");


info_temperatura = document.getElementById('temperatura');

info_umidade= document.getElementById('umidade');

gotas = document.getElementById('#drops');


temperatura_0 = data[0].data.temperature;
umidade_1 = data[1].data.humidity;
girar = girar + 0.1;


}

function draw() {
canvas.resize(windowWidth,windowHeight);

//imageMode(CENTER);
//image(logo,width/2, height-150,logo.width/1.5,logo.height/1.5);


}

