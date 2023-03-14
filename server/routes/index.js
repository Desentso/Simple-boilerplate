// Contains routes, only handles getting input and sending the response
// Communicates with controllers
const express = require('express')
const router = express.Router()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const authRoutes = require("./auth")
const userRoutes = require("./users")
const publicRoutes = require("./public")

// Combine all routes here
router.use('/auth', authRoutes)
router.use("/users", ensureAuthenticated, userRoutes)
router.use("/public", publicRoutes)

module.exports = router