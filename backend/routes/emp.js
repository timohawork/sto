const request = require('../request');
const model = require('../helpers').model;

module.exports = (app, sequelize) => {
    request(app, '/emps/add', (req, res, user) => {
        console.log('ADD employee:', req.body);

        model.add(
            sequelize.models.employees, 
            req.body, 
            newItem => {
                res.json({res: true, data: newItem});
            },
            errors => {
                res.status(404).json({errors: errors});
            }
        );
    });

    request(app, '/emps/edit', (req, res, user) => {
        console.log('EDIT employee:', req.body);

        model.edit(
            sequelize.models.employees, 
            req.body, 
            updatedItem => {
                res.json({res: true, data: updatedItem});
            },
            errors => {
                res.status(404).json({errors: errors});
            }
        );
    });

    request(app, '/emps/del', (req, res, user) => {
        console.log('DEL employee:', req.body);

        model.del(
            sequelize.models.employees, 
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