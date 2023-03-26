const socket = require('socket.io');
const express = require('express');
const { formatMessage, menuOptions, initialOptions } = require('./Helper');

class Socket {
	constructor(server) {
		this.io = socket(server, { cors: { origin: '*' } });
		this.botName = 'Dinma Bot';
		this.userName = 'User';
	}

	_emitInitialOptions(socket, message){
		socket.emit('initBotMessage', formatMessage(this.botName, message));
	}

	_emitUserMessage(socket, message) {
		socket.emit('userMessage', formatMessage(this.userName, message));
	}

	_emitBotMessage(socket, message) {
		socket.emit('botMessage', formatMessage(this.botName, message));
	}

	_userChat(data) {
		this.io.emit('userCart', data);
	}

	_clearCart() {
		this.io.emit('clearCart');
	}

	_viewOrderHistory() {
		this.io.emit('viewOrderHistory');
	}

	_checkInitUserMessage(socket, message) {
		if (message === '1') {
			this._emitBotMessage(
				socket, 'Here is the list of menu options you can choose from');
				menuOptions.forEach((el) => {
					this._emitInitialOptions(socket, el);
				});
		}
	}

	_checkUserMessage(socket, message) {
		if (message === '1') {
			this._emitBotMessage(socket, 'You have selected Jollof Rice');
			this._userChat({ menu: 'Jollof Rice' });
		} else if (message === '2') {
			this._emitBotMessage(socket, 'You have selected Fried Rice ');
			this._userChat({ menu: 'Fried Rice' });
		} else if (message === '3') {
			this._emitBotMessage(socket, 'You have selected Amala and Ewedu');
			this._userChat({ menu: 'Amala and Ewedu' });
		} else if (message === '4') {
			this._emitBotMessage(socket, 'You have selected Abacha and Ugba');
			this._userChat({ menu: 'Abacha and Ugba' });
		} else if (message === '5') {
			this._emitBotMessage(socket, 'You have selected Eba and Egusi');
			this._userChat({ menu: 'Eba and Egusi' });
		} else if (message === '6') {
			this._emitBotMessage(socket, 'You have selected Spaghetti and Meat Sauce');
			this._userChat({ menu: 'Spaghetti and Meat Sauce' });
		} else if (message === '7') {
			this._emitBotMessage(socket, 'You have selected Fried Yam and Egg Sauce');
			this._userChat({ menu: 'Fried Yam and Egg Sauce' });
		} else if (message === '8') {
			this._emitBotMessage(socket, 'You have selected Beans and Dodo');
			this._userChat({ menu: 'Beans and Dodo' });
		} else if (message === '90') {
			this._clearCart();
		} else if (message === '99') {
			this._viewOrderHistory();
		} else {
			this._emitBotMessage(socket, 'Invalid option');
		}
	}

	initializeSocket() {
		this.io.on('connection', (socket) => {
			console.log('New user connected' + socket.id);

			this._emitBotMessage(socket, 'Hello, I am Dinma Bot');

			this._emitBotMessage(
				socket,
				'Here is the list of options you can choose from',
			);

			///display menu options
			initialOptions.forEach((el) => {
				this._emitBotMessage(socket, el);
			});

			socket.on('userMessage', (message) => {
				this._checkUserMessage(socket, message);

				this._emitUserMessage(socket, message);
			});

			socket.on('initUserMessage', (message) => {
				this._checkInitUserMessage(socket, message)
			})
		});
	}

	/**
	 * @static
	 * @function createSocket
	 * @param {object} server- server instance
	 * @memberof Socket
	 * @returns {object} socketInstance - returns socket instance
	 * @description Creates a socket instance
	 */
	static createSocket(server) {
		const _createSocketInstance = (server) => {
			const socketInstance = new Socket(server);
			return socketInstance.initializeSocket();
		};

		return {
			SocketInstance: _createSocketInstance,
		};
	}
}

module.exports = Socket;
