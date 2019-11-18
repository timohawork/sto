const DataTypes = require('sequelize/lib/data-types');

const Helpers = {
	model: {}
};

Helpers.model.add = (model, data, onSuccess, onError) => {
	model.create(data)
        .then(onSuccess)
        .catch(err => {
        	onError(errorHandler(err));
        });
};

Helpers.model.edit = (model, data, onSuccess, onError) => {
	if (!data.id) return onError(errorHandler());

    model.findByPk(data.id)
        .then(item => {
            if (!item) return onError(errorHandler());

            item.update(data)
                .then(onSuccess)
                .catch(err => {
                	onError(errorHandler(err));
                });
        });
};

Helpers.model.del = (model, data, onSuccess, onError) => {
	if (!data.id) return onError(errorHandler());

	model.findByPk(data.id)
        .then(item => {
            if (!item) return onError(errorHandler());

            item.update({inTrash: true}).then(onSuccess);
        });
};

Helpers.model.define = (seq, model) => {
    let attrs = {};
    let params = {scopes: {}};
    if (model.primary) {
        attrs[model.primary] = {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        };
    }
    if (model.safe) {
        attrs.inTrash = {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        };
        params.scopes.active = {
            where: {inTrash: false}
        };
    }

    for (var id in model.attrs) {
        let attr = model.attrs[id];
        if (!attr.allowNull || attr.defaultValue !== undefined) {
            attr.allowNull || false;
        }

        attrs[id] = attr;
    }
    
    return seq.define(model.table, attrs, params);
};




function errorHandler(err) {
	if (!err) return {id: 'Неверный ID записи'};

	if (!err.errors) {
		console.log('model add error:', err);
		return {};
	}

	let res = {};
	for (var i in err.errors) res[err.errors[i].path] = err.errors[i].message;
    return res;
}


module.exports = Helpers;