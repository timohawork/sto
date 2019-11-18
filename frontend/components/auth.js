export default class Auth {
	login = (login, password, cb) => {
		fetch(process.env.BACKEND_HOST+':'+process.env.BACKEND_PORT+'/'+'admin/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
	        }, 
	        body: JSON.stringify({
				login: login,
				password: password
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.errors) {
				cb(data.errors);
				return;
			}

			this._setToken(data.token);
			cb(false);
		})
		.catch(error => console.log(error));
	};

	logout = () => {
		localStorage.removeItem('token');
	};

	isLoggedIn = () => {
		return !!this._getToken();
	};

	_getToken = () => {
		return localStorage.getItem('token');
	};

	_setToken = token => {
		localStorage.setItem('token', token);
	};

	userInfo = cb => {
		fetch(process.env.BACKEND_HOST+':'+process.env.BACKEND_PORT+'/'+'admin/info', {
			method: 'POST',
			headers: {
				Authorization: this._getToken(),
				Accept: 'application/json',
				'Content-Type': 'application/json'
	        }, 
		})
		.then(response => response.json())
		.then(cb)
		.catch(error => console.log(error));
	};
};