const passport = require('passport');

module.exports = (app, url, cb) => {
	app.post(url, (req, res, next) => {
        passport.authenticate('jwt', {session: false}, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                res.status(400).json({error: 'tokenError'});
            }
            else {
                cb(req, res, user);
            }
        })(req, res, next);
    });
};