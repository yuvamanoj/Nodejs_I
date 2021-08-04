var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true});
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs')
const session = require('express-session');
const https = require('https');
const passport = require('passport');  
const OpenIDConnectStrategy = require('passport-ci-oidc').IDaaSOIDCStrategy;

const Strategy = new OpenIDConnectStrategy({
    discoveryURL: 'https://prepiam.ice.ibmcloud.com/v1.0/endpoint/default/.well-known/openid-configuration',
    clientID : 'YTNlMmYxYTItNDAzZS00',
        scope: 'openid',
    response_type: 'code',
    clientSecret : 'YjBkOTE4NzYtNDkzYi00',
    callbackURL : 'https://registration-newoperator.cloudtribe-devops-024f02d285327b3efec3badccd07e2a1-0000.us-south.containers.appdomain.cloud/api/login-callback',
    skipUserProfile: true,
    // issuer: process.env.ISSUER
    },
    (iss, sub, profile, accessToken, refreshToken, params, done) => {  
    process.nextTick(function() {  
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;  
    done(null, profile);
    })
});



// We must implement our own secret file loading mechanism as 'dotenv' does not
// innately have this capability, nor are there convenient libraries out there.
if (process.env.NODEJS_SECRETS_DIR) {
  const dir = fs.opendirSync(process.env.NODEJS_SECRETS_DIR)
  let dirent
  while ((dirent = dir.readSync()) !== null) {
    if (!dirent.name.startsWith("..")) {
        process.env[dirent.name] = fs.readFileSync(path.join(process.env.NODEJS_SECRETS_DIR, dirent.name), {encoding:'utf8', flag:'r'})
    }
  }
  dir.closeSync()
}

require('dotenv-defaults').config({ path: process.env.NODEJS_CONFIG_PATH ? process.env.NODEJS_CONFIG_PATH : path.resolve(process.cwd(), '.env') });

const logger = require('pino-http')({
  logger: require('pino-caller')(
    require('pino')({
      level: process.env.LOG_LEVEL || 'info',
      prettyPrint:
        process.env.LOG_FORMAT === 'plain'
          ? {
              colorize: true,
              translateTime: 'yyyy-mm-dd HH:MM:ss',
              ignore: 'pid,hostname',
              messageFormat: false,
            }
          : false,
      redact: {
        paths: ['req.headers', 'res.headers', 'pid', 'hostname'],
        remove: true,
      },
    })
  )
});

//var indexRouter = require('./routes/index');
//var indexRouter = require('./client/server/server.js');
//var usersRouter = require('./routes/users');

var app = express();
// view engine setup
app.use(metricsMiddleware);
app.use(cookieParser());
app.use(session({resave: 'true', saveUninitialized:  'true' , secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(Strategy);


const swaggerDefinition = {
  info: {
    title: 'NodeJS Microservice',
    version: '0.0.1',
    description: 'Endpoints to test the user routes',
  },
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
  // apis: ['./client/server/server.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const NODE_ENV = process.env.NODE_ENV || "production";

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: true
};

app.use(cors(corsOptions));


// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);


app.get('/liveness', (req, res) => {
  logger(req, res);
  res.status(200).json({msg:
    'Application is Live'});
});

app.get('/readiness', (req, res) => {
  logger(req, res);
  res.status(200).json({msg:
'Application is Ready'});
});


app.get('/health', (req, res) => {
  logger(req, res);
  res.status(200).json({msg:
'Application is Healthy'});
});


app.get('/api/login', passport.authenticate('openidconnect', { state: Math.random().toString(36).substr(2, 10) }));

// handle callback, if authentication succeeds redirect to  
// original requested url, otherwise go to /failure  
app.get('/auth/sso/callback',function(req, res, next) {  
    var redirect_url = req.session.originalUrl;
    console.log(redirect_url);
    console.log('/auth/sso/callback', redirect_url);
    passport.authenticate('openidconnect', {  
        successRedirect: redirect_url,  
        failureRedirect:'/failure',  
    })(req,res,next);  
});

app.get('/api/login-callback', (req, res, next) => {  

  const registrationUrl = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/registration` : '/registration';
  const redirectUrl = req.session.originalUrl || registrationUrl;
  delete req.session.originalUrl;
  console.log('[/login-callback] caling passport.authenticate');
  passport.authenticate('openidconnect', (err, user) => {
    if (err) {
      console.log('[/login-callback] error during callback, redirecting to /login. Error: ', err);
      return res.redirect('/login');
    }
    if (!user) {
      console.log('[/login-callback] authentication failed, redirecting to /login');
      return res.redirect('/login');
    }

    req.logIn(user, (error) => {
      if (error) {
        console.log('[/login-callback] error during req.logIn, redirecting to /login. Error: ', error);
        return res.redirect('/login');
      }
      console.log(`[/login-callback] authentication success, redirecting to ${redirectUrl}`);
      return res.redirect(redirectUrl);
    });
  })(req, res, next);
});

// failure page  
app.get('/failure', function(req, res) {  
    res.send('login failed');
});

function ensureAuthenticated(req, res, next) {
    console.log(`[ensureAuthenticated] - resource: ${req.url}`);
    if (!req.isAuthenticated()) {
      console.log('[ensureAuthenticated] - authenticated: false');
      const contextPath = process.env.PUBLIC_URL || '/';
      const loginPage = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/login` : '/login';
      console.log(`[ensureAuthenticated] - context path: ${contextPath}`);
      console.log(`[ensureAuthenticated] - req.originalUrl: ${req.originalUrl}`);
      req.session.originalUrl = path.join(contextPath, req.originalUrl);
      res.redirect(loginPage);
    } else {
      console.log('[ensureAuthenticated] - authenticated: true');
      return next();
    }
}

app.get('/', ensureAuthenticated, (req, res) => {
    console.log('[/] - default route');
    res.redirect(process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/registration` : '/registration');
});
  
app.use(express.static(path.join(__dirname, '../build')));

app.get('/registration', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/login', (req, res) => {
    console.log('[/login] - inside Login');
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/hello', ensureAuthenticated, function(req, res) {  
    var claims = req.user['_json'];  
    console.log(claims);  
    res.send('\<h2> Hello'+ claims.firstName + claims.familyName +'\<br /> Welcome to IBMid Demo App\</h2>');  
})

app.get('/*', ensureAuthenticated, (req, res) => {
  console.log('[/*] - common route');
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.get('/info', (req, res) => {
  res.status(200).json({
    BUILD_INFO: process.env.BUILD_INFO ? process.env.BUILD_INFO : 'BUILD_INFO not available',
    NODE_ENV: process.env.NODE_ENV
  })
})

const client = require('prom-client');
const counter = new client.Counter({
  name: 'my_custom_metric',
  help: 'my_custom_metric_help_info',
});
counter.inc(10); // Increment by 10

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  logger(req, res);
  next(createError(404));
});

app.use(function(req, res, next) {
  logger(req, res);
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  logger.logger.info(`Express API server running against NODE_ENV: ${NODE_ENV} at localhost:${port}`)
});

module.exports = app;
