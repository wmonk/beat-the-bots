var request = require('request');

var commands = [{
	command: 'RECEIVE_BUTTON',
	data: ''
}, {
	command: 'POST_BLIND',
	data: ''
}, {
	command: 'CARD',
	data: 'J'
}, {
	command: 'OPPONENT_MOVE',
	data: 'BET'
}, {
	command: 'RECEIVE_CHIPS',
	data: '5'
}, {
	command: 'OPPONENT_CARD',
	data: '3'
}];

// request.post({ url: 'http://beat-the-bots.dokku.julianhaeger.com/start', form: {
request.post({ url: 'http://10.44.14.98:3333/start', form: {
	'OPPONENT_NAME': 'botter',
	'HAND_LIMIT': '30123123',
	'STARTING_CHIP_COUNT': '123123'
}}, function (err) {
	console.log(err);

	run();
});
var i = 0;
// run();

function run() {
	var command = commands[Math.floor(Math.random()*commands.length)];
	// request.post({ url: 'http://beat-the-bots.dokku.julianhaeger.com/update', form: {
	request.post({ url: 'http://10.44.14.98:3333/update', form: {
		COMMAND: command.command,
		DATA: command.data
	}}, function (err, resp, body) {
		if (err) {
			return console.log(err);
		}
		console.log(body);

		if (i < 10000) {
			i++;
			run();
		}
	});
}
