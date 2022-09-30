
const config = require('config'); // locating environment variables 
// const Joi = require('joi'); // returns class.
const helmet = require('helmet'); // middleware that gives headers to routes to secure them
const Joi = require("@hapi/joi");
const { validate } = require("@hapi/joi/lib/types/alternatives");
const debug = require('debug')('app:startup')
const morgan = require('morgan'); // important for logging http requests. It logs requests on the terminal: type of request,address, failed or successful, time taken to process,etc
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const logger = require('./middleware/logger');
const app = express();

app.use(express.json()); // express.jason is a middleware that parses requests(objects) in the form of req.body in json format
app.use(express.urlencoded({extended: true})); //parses objects,arrays,etc in the forme of key=value
app.use(express.static('public')) //a folder is passed as an argument and inside the folder contains all static assets like Css,images and all.
app.use(helmet());
app.set('view engine', 'pug'); // no need to require the pug module,it is alwas loaded by default. This helps return data in form of HTML from the database instead of json.Its a template engine.
app.set('views', './views'); // this needs a folder(which has all the templates and) to be open in the root of the appplication
// configuration config.get goes around environment variables and other sources to mapthe below to and display them on the terminal
console.log('Application Name:' + config.get('name'));
console.log('Mail-Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password')); //password safe in the environment variable.
app.use('/api/courses', courses); // two arguments. we tell express that any route that starts with /api/courses,use the courses router.
app.use('/', home);
if (app.get('env') ==='development') {
app.use(morgan('tiny')); // logs http request in terminal 
debug('Morgan enabled...'); // To change the environment to production or staging environment,on terminal,use : export NODE_ENV=production and restart the server with nodemon index.js
}
app.use(logger);







const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));