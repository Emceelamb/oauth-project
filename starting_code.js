/* 
 * Package Imports
*/

const express = require('express');
const partials = require('express-partials');





const app = express();


/*
 * Variable Declarations
*/

const PORT = 3000;





/*
 * Passport Configurations
*/







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

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});




/*
 * Listener
*/

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

/*
 * ensureAuthenticated Callback Function
*/

