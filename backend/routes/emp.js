const request = require('../request');
const model = require('../models/employee');

module.exports = app => {
    request(app, '/emps/add', (req, res, user) => {
        const data = req.body;
        const emp = model();
        console.log('ADD employee:', data);

        emp.add(data, errors => {
            if (errors !== false) return res.status(404).json({errors: errors});
            return res.json({res: true, data: emp.data});
        });
    });

    request(app, '/emps/edit', (req, res, user) => {
        const data = req.body;
        const emp = model();
        console.log('EDIT employee:', data);

        emp.edit(data, errors => {
            if (errors !== false) return res.status(404).json({errors: errors});
            return res.json({res: true});
        });
    });

    request(app, '/emps/del', (req, res, user) => {
        const data = req.body;
        const emp = model();
        console.log('DEL employee:', data);

        emp.del(data.login, error => {
            if (error) return res.status(404).json({error: error});
            return res.json({res: true});
        });
    });
};