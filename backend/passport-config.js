require('dotenv').config();
const pjwt = require('passport-jwt');
const Strategy = pjwt.Strategy;
const ExtractJwt = pjwt.ExtractJwt;
const DB = require('./db');
const Admin = DB('admins');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      const user = Admin.get(payload.login);
      if (user) {
        return done(null, {
          login: payload.login,
          name: user.name
        });
      }
      return done(null, false);
    })
  )
};