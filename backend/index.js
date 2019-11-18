require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cp = require('cookie-parser');
const bp = require('body-parser');
const passport = require('passport');
const Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cp());
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(passport.initialize());

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'postgres'
});
require('./models/admins')(sequelize);
require('./models/cars')(sequelize);
require('./models/employees')(sequelize);
require('./models/spares')(sequelize);
require('./models/tasks')(sequelize);

const dropDB = false;

sequelize.sync({force: dropDB}).then(() => {
	require('./passport-config')(passport, sequelize);

	require('./routes/admin')(app, sequelize);
	require('./routes/data')(app, sequelize);
	require('./routes/car')(app, sequelize);
	require('./routes/emp')(app, sequelize);
	require('./routes/task')(app, sequelize);
	require('./routes/spare')(app, sequelize);

	// NEW ADMIN
	if (dropDB) {
		sequelize.models.admins
			.create({
				login: 'admin',
				name: 'Администратор',
				password: '123456'

			})
			.then(admin => {
				console.log('NEW admin: '+admin.login+'('+admin.name+')');
			});
	}

	app.listen(port, err => {
		if (err) console.error(err);
		console.log('Listening for Requests on port:', port);
	});
});