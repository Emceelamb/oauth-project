const express = require('express');
const partials = require('express-partials')
const passport = require('passport');
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();

/*
 * Variables
*/

const PORT = 3000;

/*
 *  Express Project Setup
*/

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.json());

app.use(express.static(__dirname + '/public'));

/*
 * Routes
*/

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
})

app.get('/account', (req, res) => {
  res.render('account', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
})

/*
 * Listener
*/

app.listen(PORT, () => console.log(`Listening on ${PORT}`));