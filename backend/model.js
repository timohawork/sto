module.exports = table => {
	const DB = require('./db');

	const self = {
		db: DB(table),
		id: '',
		data: {}
	};

	self._add = cb => {
		self.db.put('/'+self.id, self.data, cb);
	};

	self.find = id => {
		var data = self.db.get('/'+id);
		self.data = data;
		return !!data;
	};

	self.list = () => {
		var list = self.db.keys();
		var res = [];
		//var trash = [];
		list.map(val => {
			let data = self.db.get(val);
			if (!data.inTrash) {
				res.push(data);
			}
			/*else {
				trash.push(data);
			}*/
		});
		//console.log(table, 'list:', res);
		//console.log(table, 'trash list:', trash);
		return res;
	};

	return self;
};