const request = require('../request');
const model = require('../models/task');

module.exports = app => {
    request(app, '/tasks/add', (req, res, user) => {
    	const data = req.body;
    	const task = model();
    	console.log('ADD task:', data);

    	task.add(data, errors => {
        	if (errors !== false) return res.status(404).json({errors: errors});
        	return res.json({res: true, data: task.data});
        });
    });

    request(app, '/tasks/edit', (req, res, user) => {
        const data = req.body;
        const task = model();
        console.log('EDIT task:', data);

        task.edit(data, errors => {
            if (errors !== false) return res.status(404).json({errors: errors});
            return res.json({res: true});
        });
    });

    request(app, '/tasks/del', (req, res, user) => {
        const data = req.body;
        const task = model();
        console.log('DEL task:', data);

        task.del(data.id, error => {
            if (error) return res.status(404).json({error: error});
            return res.json({res: true});
        });
    });
};