const DataTypes = require('sequelize/lib/data-types');
const modelHelper = require('../helpers').model;

const model = {
	table: 'employees',
	primary: 'id',
	safe: true,
	attrs: {
		login: {
			type: DataTypes.STRING(30),
			validate: {
				notEmpty: {msg: "Логин не может быть пустым"}
			}
		},
		name: {
			type: DataTypes.STRING(100),
			validate: {
				notEmpty: {msg: "Имя не может быть пустым"}
			}
		},
		pos: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {msg: "Необходимо выбрать должность"}
			}
		}
	}
};

module.exports = sequelize => {
	return modelHelper.define(sequelize, model);
};