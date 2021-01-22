require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);


require('./startegies/discord');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connection Established"))
    .catch((err) => console.log(`MongoDB Error : ${err}`));

app.use(session({
    secret: 'seagqwtqpjmi125j12i15',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/dashboard'));

app.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log("Web Dashboard is online!"));