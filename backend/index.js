require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cp = require('cookie-parser');
const bp = require('body-parser');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cp());
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(passport.initialize());
require('./passport-config')(passport);

require('./routes/admin')(app);
require('./routes/data')(app);
require('./routes/emp')(app);
require('./routes/car')(app);
require('./routes/task')(app);
require('./routes/spare')(app);

app.listen(port, err => {
    if(err) console.error(err);
    console.log('Listening for Requests on port: '+port);
});