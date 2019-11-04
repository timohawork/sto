const request = require('../request');
const carModel = require('../models/car');
const empModel = require('../models/employee');
const taskModel = require('../models/task');
const spareModel = require('../models/spare');

module.exports = app => {
    request(app, '/data/init', (req, res, user) => {
        res.json({
            cars: (carModel()).list(),
            emps: (empModel()).list(),
            tasks: (taskModel()).list(),
            spares: (spareModel()).list()
        });
    });
};