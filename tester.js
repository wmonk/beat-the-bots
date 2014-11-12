// var globUrl = 'http://beat-the-bots.dokku.julianhaeger.com';
var globUrl = 'http://10.44.14.98:3333';
var request = require('request');

var commands = [{
	command: 'RECEIVE_BUTTON',
	url: '/update',
	data: ''
}, {
	command: 'POST_BLIND',
	url: '/update',
	data: ''
}, {
	command: 'CARD',
	url: '/update',
	data: 'K'
}, {
	command: 'OPPONENT_MOVE',
	url: '/update',
	data: 'BET:10'
}, {
	command: 'RECEIVE_CHIPS',
	url: '/update',
	data: '5'
}, {
	command: 'OPPONENT_CARD',
	url: '/update',
	data: '3'
}, {
	url: '/move'
}];

request.post({
	url: globUrl + '/start',
	form: {
		'OPPONENT_NAME': 'botter',
		'HAND_LIMIT': '30123123',
		'STARTING_CHIP_COUNT': '123123'
	}
}, function (err) {
	console.log(err);

	run();
});
var i = 0;
// run();

function run() {
	var command = commands[Math.floor(Math.random() * commands.length)];
	if (command.url === '/move') {
		request(globUrl + command.url, function (err, res, body) {
			if (err) {
				console.log(command.url);
				return console.log(err);
			}

			if (res.statusCode !== 200) {
				console.log(command.url);
				return console.log(body);
			}

			console.log(body);
			if (i < 10000) {
				i++;
				run();
			}
		});
	} else {
		request.post({
			url: globUrl + command.url,
			form: {
				COMMAND: command.command,
				DATA: command.data
			}
		}, function (err, resp, body) {
			if (err) {
				console.log(command.url);
				return console.log(err);
			}
			if (resp.statusCode !== 200) {
				console.log(command.url);
				return console.log(body);
			}

			console.log(body);

			if (i < 10000) {
				i++;
				run();
			}
		});
	}
}
