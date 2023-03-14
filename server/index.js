require('dotenv').config()
if (process.env.NODE_ENV === "production") {
  require("newrelic");
}

const express = require('express')
const expressSession = require('express-session')

const helmet = require("helmet")
const gzipCompression = require("compression")

const passport = require("passport")
const PassportLocalStrategy = require('passport-local').Strategy

const bcrypt = require("bcrypt")

const routes = require('./routes')
const allowCORS = require('./middleware/cors')

const {app, server} = require("./server")

const { NODE_ENV } = process.env

const prisma = require("./database")

const isProduction = process.env.NODE_ENV === "production"
const Bugsnag = require('@bugsnag/js')

const BugsnagPluginExpress = require('@bugsnag/plugin-express')

if (isProduction) {
  Bugsnag.start({
    apiKey: process.env.BUGSNAG_KEY,
    plugins: [BugsnagPluginExpress]
  })
}


let middleware

if (isProduction) {
  middleware = Bugsnag.getPlugin('express')

  app.use(middleware.requestHandler)
}

passport.use(new PassportLocalStrategy({
    usernameField: 'email',
  },
  async (email, password, callback) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          isAdmin: true
        }
      })
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return callback(null, {...user, password: undefined});
        } else {
          return callback(err, false);
        }
      });
    } catch(e) {
      return callback(e, false)
    }
  }));

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser(async (id, callback) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        isAdmin: true
      },
    })
    callback(null, user)
  } catch(e) {
    callback(e)
  }
});


if (NODE_ENV === 'production') {
  app.use(helmet())
}
app.use(expressSession({
  secret: 'add_secret_here', // TODO: Update secret
  name: "sessionId",
  store: new (require('connect-pg-simple')(expressSession))(),
  cookie: {
    httpOnly: true,
    secure: true,
    domain: NODE_ENV === "production" ? "example.com" : undefined,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  },
  proxy: true,
  resave: false, 
  saveUninitialized: false,
  rolling: true,
}));

app.use(gzipCompression())

app.set('trust proxy', true)

app.use(passport.initialize());
app.use(passport.session());

// Have to handle CORS preflight requests explicitly here, as it can't handle auth
app.options('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.header("origin"))
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-CLIENT-AUTH-TOKEN')
  res.header("Access-Control-Allow-Credentials", "true")

  res.sendStatus(200)
})
app.use(allowCORS)

app.get("/", (req, res) => res.send("OK"))

/*if (NODE_ENV === 'production') {
  // This serves everything from build folder at the root level
  app.use(express.static(path.join(__dirname, 'build')))
}*/

// Support for parsing of application/json type post data
app.use(express.json({ limit: "5mb" }));

app.use('/api', routes)

if (isProduction) {
  app.use(middleware.errorHandler)
}

/*if (NODE_ENV === 'production') {
  // This has to be last so that we don't get conflicts with the API routes
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}*/

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`API listening at http://localhost:${PORT}`))
