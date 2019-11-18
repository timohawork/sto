const request = require('../request');

module.exports = (app, sequelize) => {
    request(app, '/data/init', (req, res, user) => {
    	sequelize.models.cars.scope('active').findAll().then(cars => {
    		sequelize.models.employees.scope('active').findAll().then(emps => {
    			sequelize.models.tasks.scope('active').findAll().then(tasks => {
    				sequelize.models.spares.scope('active').findAll().then(spares => {
						res.json({
							cars: cars,
							emps: emps,
							tasks: tasks,
							spares: spares
						});
					});
				});
			});
		});
    });
};