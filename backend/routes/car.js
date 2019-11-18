const request = require('../request');
const model = require('../helpers').model;

module.exports = (app, sequelize) => {
    request(app, '/cars/add', (req, res, user) => {
    	console.log('ADD car:', req.body);

        model.add(
            sequelize.models.cars, 
            req.body, 
            newItem => {
                res.json({res: true, data: newItem});
            },
            errors => {
                res.status(404).json({errors: errors});
            }
        );
    });

    request(app, '/cars/edit', (req, res, user) => {
        console.log('EDIT car:', req.body);

        model.edit(
            sequelize.models.cars, 
            req.body, 
            updatedItem => {
                res.json({res: true, data: updatedItem});
            },
            errors => {
                res.status(404).json({errors: errors});
            }
        );
    });

    request(app, '/cars/del', (req, res, user) => {
        console.log('DEL car:', req.body);

        model.del(
            sequelize.models.cars, 
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