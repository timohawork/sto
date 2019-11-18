const DataTypes = require('sequelize/lib/data-types');
const modelHelper = require('../helpers').model;

const model = {
	table: 'admins',
	primary: 'id',
	safe: false,
	attrs: {
		login: {
			type: DataTypes.STRING(30)
		},
		name: {
			type: DataTypes.STRING(100)
		},
		password: {
			type: DataTypes.STRING(100)
		}
	}
};

module.exports = sequelize => {
	return modelHelper.define(sequelize, model);
};