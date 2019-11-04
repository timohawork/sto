const model = require('../model');

module.exports = () => {
	const self = model('task');

	const types = {
		1: 'Диагностика',
		2: 'Плановое ТО',
		3: 'Замена масла',
		4: 'Шиномонтаж',
		5: 'Ремонт электрики'
	};
	const statuses = {
		1: 'Новая',
		2: 'В работе',
		3: 'Ожидает оплаты',
		4: 'Выполнена',
		5: 'Отклонена'
	};

	self.data = {
		id: '',
		type: '',
		status: '',
		title: '',
		comment: '',
		start_date: '',
		end_date: '',
		sum: '',
		carId: '',
		empId: ''
	};

	self.valid = () => {
		let errors = {};
		if (!self.data.type) {
			errors.type = 'Тип обязателен для заполнения';
		}
		if (!self.data.title) {
			errors.title = 'Название не может быть пустым';
		}
		if (!self.data.comment) {
			errors.comment = 'Комментарий обязателен для заполнения';
		}
		if (!self.data.sum) {
			errors.sum = 'Сумма обязательна для заполнения';
		}
		if (!self.data.carId) {
			errors.carId = 'Необходимо выбрать автомобиль';
		}
		if (!self.data.empId) {
			errors.empId = 'Необходимо выбрать сотрудника';
		}
		return Object.keys(errors).length ? errors : false;
	};
	
	self.add = (data, cb) => {
		self.data.type = data.type;
		self.data.title = data.title;
		self.data.comment = data.comment;
		self.data.sum = parseInt(data.sum);
		self.data.carId = data.carId;
		self.data.empId = data.empId;
		let isValid = self.valid();
		if (isValid === false) {
			self.data.id = 'id_'+Date.now();
			self.data.status = 1;
			self.data.start_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			self.id = self.data.id;
			self._add(res => {
				cb(false);
			});
		}
		else cb(isValid);
	};

	self.edit = (data, cb) => {
		if (!self.find(data.id)) {
			cb({error: 'Wrond ID!'});
			return;
		}
		self.data.type = data.type;
		self.data.title = data.title;
		self.data.comment = data.comment;
		self.data.sum = data.sum;
		self.data.carId = data.carId;
		self.data.empId = data.empId;
		self.data.status = data.status;
		let isValid = self.valid();
		if (isValid === false) {
			self.id = self.data.id;
			if (self.data.status == 4 || self.data.status == 5) {
				self.data.end_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			}
			self._add(res => {
				cb(false);
			});
		}
		else cb(isValid);
	};

	self.del = (id, cb) => {
		if (!self.find(id)) {
			cb('Wrond ID!');
			return;
		}
		self.id = id;
		self.data.inTrash = true;
		self._add(res => {
			cb(false);
		})
	};

	return self;
};