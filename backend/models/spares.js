const DataTypes = require('sequelize/lib/data-types');
const modelHelper = require('../helpers').model;

const model = {
	table: 'spares',
	primary: 'id',
	safe: true,
	attrs: {
		title: {
			type: DataTypes.STRING(100),
			validate: {
				notEmpty: {msg: "Название не может быть пустым"}
			}
		},
		catNum: {
			type: DataTypes.STRING(100),
			validate: {
				notEmpty: {msg: "Каталожный номер не может быть пустым"}
			}
		},
		price: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {msg: "Цена не может быть пустой"}
			}
		},
		taskId: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {msg: "Номер задачи не может быть пустым"}
			}
		},
		buy_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		install_date: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}
};

module.exports = sequelize => {
	return modelHelper.define(sequelize, model);
};