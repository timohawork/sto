require('dotenv').config();
const secret = process.env.SECRET;

const request = require('../request');
const jwt = require('jsonwebtoken');

const DB = require('../db');
const Admin = DB('admins');

module.exports = app => {
	app.post('/admin/login', (req, res, next) => {
		const login = req.body.login;
		const password = req.body.password;
		const user = Admin.get(login);
		const errors = {};

		if (!login) {
			errors.login = "Логин не может быть пустым";
			return res.status(404).json({errors: errors});
		}
		if (!password) {
			errors.password = "Пароль не может быть пустым";
			return res.status(404).json({errors: errors});
		}
		if (!user) {
			errors.password = "Неверный логин или пароль";
			return res.status(404).json({errors: errors});
		}
		/*bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {*/
			if (password == user.password) {
				const payload = {
					login: login,
					name: user.name
				};
				jwt.sign(payload, secret, {expiresIn: 36000}, (err, token) => {
					if (err) {
						errors.password = "Ошибка подключения токена";
						res.status(500).json({errors: errors}); 
					}
					res.json({
						token: 'Bearer '+token
					});
				});      
			}
			else {
				errors.password = "Неверный логин или пароль";                        
				res.status(400).json({errors: errors});
	  		}
	  	//});
	});

	request(app, '/admin/info', (req, res, user) => {
		res.json({user: user});
	});
};