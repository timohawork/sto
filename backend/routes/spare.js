const request = require('../request');
const model = require('../models/spare');

module.exports = app => {
    request(app, '/spares/add', (req, res, user) => {
    	const data = req.body;
    	const spare = model();
    	console.log('ADD spare:', data);

    	spare.add(data, errors => {
        	if (errors !== false) return res.status(404).json({errors: errors});
        	return res.json({res: true, data: spare.data});
        });
    });

    request(app, '/spares/edit', (req, res, user) => {
        const data = req.body;
        const spare = model();
        console.log('EDIT spare:', data);

        spare.edit(data, errors => {
            if (errors !== false) return res.status(404).json({errors: errors});
            return res.json({res: true});
        });
    });

    request(app, '/spares/del', (req, res, user) => {
        const data = req.body;
        const spare = model();
        console.log('DEL spare:', data);

        spare.del(data.id, error => {
            if (error) return res.status(404).json({error: error});
            return res.json({res: true});
        });
    });
};