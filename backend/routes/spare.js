const request = require('../request');
const model = require('../helpers').model;

module.exports = (app, sequelize) => {
    request(app, '/spares/add', (req, res, user) => {
    	console.log('ADD spare:', req.body);

    	model.add(
            sequelize.models.spares, 
            req.body, 
            newItem => {
                res.json({res: true, data: newItem});
            },
            errors => {
                res.status(404).json({errors: errors});
            }
        );
    });

    request(app, '/spares/edit', (req, res, user) => {
        console.log('EDIT spare:', req.body);

        model.edit(
            sequelize.models.spares, 
            req.body, 
            updatedItem => {
                res.json({res: true, data: updatedItem});
            },
            errors => {
                res.status(404).json({errors: errors});
            }
        );
    });

    request(app, '/spares/del', (req, res, user) => {
        console.log('DEL spare:', req.body);

        model.del(
            sequelize.models.spares, 
            req.body, 
            () => {
                res.json({res: true});
            },
            errors => {
                res.status(404).json({errors: errors});
            }
        );
    });
};