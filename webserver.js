var WebSocket = require('ws');
var wss = new WebSocket.Server({port:8081});
var express = require('express');
var app = express();
var Gpio = require('onoff').Gpio;
var redWire = new Gpio(10, 'out');
var greenWire = new Gpio(25, 'out');
var whiteWire = new Gpio(9, 'out');
var blackWire = new Gpio(11, 'out');

app.use('/pictures', express.static(__dirname  + '/photos'));
app.use('/style',express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/'));

wss.on('connection', function (ws){
	console.log('connection');
	redWire.writeSync(1);
	greenWire.writeSync(1);
	whiteWire.writeSync(0);
	blackWire.writeSync(1);
	ws.on('message', function (message) {
		console.log(message);
		var x = JSON.parse(message);
		if(x.light == 'red'){
		redWire.writeSync(0);
		greenWire.writeSync(1);
		whiteWire.writeSync(1);
		blackWire.writeSync(1);	
		}
		if(x.light == 'yellow'){
		redWire.writeSync(1);
		greenWire.writeSync(0);
		whiteWire.writeSync(1);
		blackWire.writeSync(1);
		}
		if(x.light == 'green'){
		redWire.writeSync(1);
		greenWire.writeSync(1);
		whiteWire.writeSync(0);
		blackWire.writeSync(1);
		}
		if(x.light == 'broke'){
		redWire.writeSync(0);
		greenWire.writeSync(0);
		whiteWire.writeSync(0);
		blackWire.writeSync(0);
		}
	});


	ws.on('close', function(){
		redWire.writeSync(0);
		greenWire.writeSync(0);
		whiteWire.writeSync(0);
		blackWire.writeSync(0);
	});

});

app.listen(8080);
