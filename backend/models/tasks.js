const DataTypes = require('sequelize/lib/data-types');
const modelHelper = require('../helpers').model;

const model = {
	table: 'tasks',
	primary: 'id',
	safe: true,
	attrs: {
		type: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {msg: "Необходимо выбрать тип"}
			}
		},
		status: {
			type: DataTypes.INTEGER,
			defaultValue: 1
		},
		title: {
			type: DataTypes.STRING(100),
			validate: {
				notEmpty: {msg: "Название не может быть пустым"}
			}
		},
		comment: {
			type: DataTypes.TEXT,
			validate: {
				notEmpty: {msg: "Комментарий обязателен"}
			}
		},
		start_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		sum: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {msg: "Сумма не может быть пустой"}
			}
		},
		carId: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {msg: "Необходимо выбрать автомобиль"}
			}
		},
		empId: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {msg: "Необходимо выбрать сотрудника"}
			}
		}
	}
};

module.exports = sequelize => {
	return modelHelper.define(sequelize, model);
};