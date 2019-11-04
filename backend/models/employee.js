const model = require('../model');

module.exports = () => {
	const self = model('employee');

	const positions = {
		1: 'Работник',
		2: 'Механик',
		3: 'Электрик',
		4: 'Мастер'
	};

	self.data = {
		login: '',
		name: '',
		password: '',
		pos: 0
	};

	self.valid = () => {
		let errors = {};
		if (!self.data.login) {
			errors.login = 'Логин не может быть пустым';
		}
		if (!self.data.name) {
			errors.name = 'Не указано имя';
		}
		if (!self.data.password) {
			errors.password = 'Пароль обязателен для заполнения';
		}
		if (!self.data.pos) {
			errors.pos = 'Не указана должность';
		}
		return Object.keys(errors).length ? errors : false;
	};
	
	self.add = (data, cb) => {
		self.data.login = data.login;
		self.data.name = data.name;
		self.data.password = data.password;
		self.data.pos = parseInt(data.pos);
		let isValid = self.valid();
		if (isValid === false) {
			self.id = self.data.login;
			self._add(res => {
				cb(false);
			});
		}
		else cb(isValid);
	};

	self.edit = (data, cb) => {
		if (!self.find(data.login)) {
			cb({error: 'Wrond ID!'});
			return;
		}
		self.data.name = data.name;
		self.data.pos = parseInt(data.pos);
		let isValid = self.valid();
		if (isValid === false) {
			self.id = self.data.login;
			self._add(res => {
				cb(false);
			});
		}
		else cb(isValid);
	};

	self.del = (login, cb) => {
		if (!self.find(login)) {
			cb('Wrond ID!');
			return;
		}
		self.id = login;
		self.data.inTrash = true;
		self._add(res => {
			cb(false);
		})
	};

	return self;
};