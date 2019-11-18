const request = require('../request');
const model = require('../helpers').model;

module.exports = (app, sequelize) => {
    request(app, '/tasks/add', (req, res, user) => {
    	console.log('ADD task:', req.body);

    	model.add(
            sequelize.models.tasks, 
            req.body, 
            newItem => {
                res.json({res: true, data: newItem});
            },
            errors => {
                res.status(404).json({errors: errors});
            }
        );
    });

    request(app, '/tasks/edit', (req, res, user) => {
        console.log('EDIT task:', req.body);

        model.edit(
            sequelize.models.tasks, 
            req.body, 
            updatedItem => {
                res.json({res: true, data: updatedItem});
            },
            errors => {
                res.status(404).json({errors: errors});
            }
        );
    });

    request(app, '/tasks/del', (req, res, user) => {
        console.log('DEL task:', req.body);

        model.del(
            sequelize.models.tasks, 
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