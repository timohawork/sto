require('dotenv').config();
const pjwt = require('passport-jwt');
const Strategy = pjwt.Strategy;
const ExtractJwt = pjwt.ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = (passport, sequelize) => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      sequelize.models.admins
        .findOne({where: {login: payload.login}})
        .then(admin => {
          if (!admin) {
            return done(null, false);
          }
          return done(null, {
            login: payload.login,
            name: admin.name
          });
        })
    })
  )
};