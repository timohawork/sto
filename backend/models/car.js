const model = require('../model');

module.exports = () => {
	const self = model('car');

	self.data = {
		num: '',
		owner: '',
		year: 0,
		vin: '',
		phone: '',
		brand: '',
		model: '',
		inTrash: false
	};

	self.valid = () => {
		let errors = {};
		if (!self.data.num) {
			errors.num = 'Номер не может быть пустым';
		}
		if (!self.data.owner) {
			errors.owner = 'Не указан владелец';
		}
		if (!self.data.year) {
			errors.year = 'Год выпуска обязателен для заполнения';
		}
		if (!self.data.vin) {
			errors.vin = 'VIN код обязателен для заполнения';
		}
		if (!self.data.phone) {
			errors.phone = 'Не указан телефон владельца';
		}
		if (!self.data.brand) {
			errors.brand = 'Не указана марка автомобиля';
		}
		if (!self.data.model) {
			errors.model = 'Не указана модель автомобиля';
		}
		return Object.keys(errors).length ? errors : false;
	};
	
	self.add = (data, cb) => {
		self.data.num = data.num;
        self.data.owner = data.owner;
        self.data.year = parseInt(data.year);
        self.data.vin = data.vin;
        self.data.phone = data.phone;
        self.data.brand = data.brand;
        self.data.model = data.model;
        let isValid = self.valid();
		if (isValid === false) {
			self.id = data.vin;
			self._add(res => {
				cb(false);
			});
		}
		else cb(isValid);
	};

	self.edit = (data, cb) => {
		if (!self.find(data.vin)) {
			cb({errors: 'Wrond ID!'});
			return;
		}
		self.data.num = data.num;
        self.data.owner = data.owner;
        self.data.year = parseInt(data.year);
        self.data.phone = data.phone;
        self.data.brand = data.brand;
        self.data.model = data.model;
        let isValid = self.valid();
		if (isValid === false) {
			self.id = data.vin;
			self._add(res => {
				cb(false);
			});
		}
		else cb(isValid);
	};

	self.del = (vin, cb) => {
		if (!self.find(vin)) {
			cb('Wrond ID!');
			return;
		}
		self.id = vin;
		self.data.inTrash = true;
		self._add(res => {
			cb(false);
		})
	};

	return self;
};