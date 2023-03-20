const moment = require('moment');

function formatMessage(username, text) {
	return {
		username,
		text,
		time: moment().format('h:mm a'),
	};
}

const menuOptions = [
	'1. Meat Pie',
	'2. Chicken Pie',
	'3. Beef Pie',
	'4. Fish Pie',
];

module.exports = { formatMessage, menuOptions };
