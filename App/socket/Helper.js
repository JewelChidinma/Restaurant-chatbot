const moment = require('moment');

function formatMessage(username, text) {
	return {
		username,
		text,
		time: moment().format('h:mm a'),
	};
}

const menuOptions = [
	'1. Jollof Rice',
	'2. Fried Rice',
	'3. Amala and Ewedu',
	'4. Abacha and Ugba',
	'5. Eba and Egusi',
	'6. Spaghetti and Meat Sauce',
	'7. Fried Yam and Egg Sauce',
	'8. Beans and Dodo',
];

const initialOptions = [
	"Select 1 to Place an order",
    "Select 99 to checkout order",
    "Select 98 to see order history",
    "Select 97 to see current order",
    "Select 0 to cancel order",
];


module.exports = { formatMessage, menuOptions, initialOptions };
