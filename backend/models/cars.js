const DataTypes = require('sequelize/lib/data-types');
const modelHelper = require('../helpers').model;

const model = {
	table: 'cars',
	primary: 'id',
	safe: true,
	attrs: {
		num: {
			type: DataTypes.STRING(10),
			validate: {
				notEmpty: {msg: "Номер не может быть пустым"}
			}
		},
		owner: {
			type: DataTypes.STRING(100),
			validate: {
				notEmpty: {msg: "Имя владельца не может быть пустым"}
			}
		},
		year: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {msg: "Год не может быть пустым"}
			}
		},
		vin: {
			type: DataTypes.STRING(17),
			validate: {
				notEmpty: {msg: "VIN не может быть пустым"}
			}
		},
		phone: {
			type: DataTypes.STRING(12),
			validate: {
				notEmpty: {msg: "Номер телефона не может быть пустым"}
			}
		},
		brand: {
			type: DataTypes.STRING(20),
			validate: {
				notEmpty: {msg: "Бренд не может быть пустым"}
			}
		},
		model: {
			type: DataTypes.STRING(50),
			validate: {
				notEmpty: {msg: "Модель не может быть пустым"}
			}
		}
	}
};

module.exports = sequelize => {
	return modelHelper.define(sequelize, model);
};