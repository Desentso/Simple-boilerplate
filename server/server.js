const app = require('express')();
const fs = require('fs')

const server = process.env.NODE_ENV === "production" 
  ? require('http').createServer(app)
  : require('https')
      .createServer({
        key: fs.readFileSync('../server.key'),
        cert: fs.readFileSync('../server.cert')
      }, app)

module.exports = {
  app,
  server
}

//"postinstall": "cd server && npm install && cd .. && cd client && npm install && npm run build && mv build ../server/build",