require('dotenv').config();
const secret = process.env.SECRET;

const request = require('../request');
const jwt = require('jsonwebtoken');

module.exports = (app, sequelize) => {
	app.post('/admin/login', (req, res, next) => {
		const login = req.body.login;
		const password = req.body.password;
		const errors = {};

		if (!login) {
			errors.login = "Логин не может быть пустым";
			return res.status(404).json({errors: errors});
		}
		if (!password) {
			errors.password = "Пароль не может быть пустым";
			return res.status(404).json({errors: errors});
		}
		sequelize.models.admins
			.findOne({where: {login: login}})
			.then(admin => {
				if (!admin) {
					errors.password = "Неверный логин или пароль";
					return res.status(404).json({errors: errors});
				}
				//bcrypt.compare(password, admin.password).then(isMatch => {
					//if (isMatch) {
					if (password == admin.password) {
						const payload = {
							login: login,
							name: admin.name
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
	});

	request(app, '/admin/info', (req, res, user) => {
		res.json({user: user});
	});
};