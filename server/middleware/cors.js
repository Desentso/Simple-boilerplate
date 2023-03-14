// The react app is running on different port, so we need to allow CORS so that
// it can communicate with this Node app
// ONLY FOR DEVELOPMENT
const allowCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.header("origin"))
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
  res.header("Access-Control-Allow-Credentials", "true")
  next()
}

module.exports = allowCORS