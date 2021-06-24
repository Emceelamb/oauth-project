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
const GITHUB_CLIENT_ID = "<CLIENT ID>";
const GITHUB_CLIENT_SECRET = "<CLIENT SECRET>"

/*
 * Passport session setup
*/

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

/*
 * GitHubStrategy
*/

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      // Returns github profile
      return done(null, profile);
    });
  })
)



/*
 *  Express Project Setup
*/

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'topsecret', resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

/*
 * Routes
*/

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
})

app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
})

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user' ] })
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/'
  })
)
/*
 * Listener
*/

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
