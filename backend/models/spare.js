const model = require('../model');

module.exports = () => {
	const self = model('spare');

	self.data = {
		id: '',
		title: '',
		catNum: '',
		price: '',
		taskId: '',
		buy_date: '',
		install_date: ''
	};

	self.valid = () => {
		let errors = {};
		if (!self.data.title) {
			errors.title = 'Название не может быть пустым';
		}
		if (!self.data.catNum) {
			errors.catNum = 'Не указан каталожный номер';
		}
		if (!self.data.price) {
			errors.price = 'Не указана цена';
		}
		if (!self.data.taskId) {
			errors.taskId = 'Не указан идентификатор задачи';
		}
		return Object.keys(errors).length ? errors : false;
	};
	
	
	self.add = (data, cb) => {
		self.data.title = data.title;
		self.data.catNum = data.catNum;
		self.data.price = parseInt(data.price);
		self.data.taskId = data.taskId;
		let isValid = self.valid();
		if (isValid === false) {
			self.data.id = 'id_'+Date.now();
			self.data.buy_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
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
		self.data.title = data.title;
		self.data.catNum = data.catNum;
		self.data.price = data.price;
		let isValid = self.valid();
		if (isValid === false) {
			self.id = self.data.id;
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