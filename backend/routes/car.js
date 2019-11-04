const request = require('../request');
const model = require('../models/car');

module.exports = app => {
    request(app, '/cars/add', (req, res, user) => {
    	const data = req.body;
    	const car = model();
        console.log('ADD car:', data);

    	car.add(data, errors => {
            if (errors !== false) return res.status(404).json({errors: errors});
        	return res.json({res: true});
        });
    });

    request(app, '/cars/edit', (req, res, user) => {
        const data = req.body;
        const car = model();
        console.log('EDIT car:', data);

        car.edit(data, errors => {
            if (errors !== false) return res.status(404).json({errors: errors});
            return res.json({res: true});
        });
    });

    request(app, '/cars/del', (req, res, user) => {
        const data = req.body;
        const car = model();
        console.log('DEL car:', data);

        car.del(data.vin, error => {
            if (error) return res.status(404).json({error: error});
            return res.json({res: true});
        });
    });
};