const express = require("express")
const { body, validationResult } = require('express-validator');

const prisma = require("../database");
const getUser = require("../serializers/user");

const router = express.Router()

// GET /api/users/current
// Get currently logged in user's info
router.get(
  "/current",
  async (req, res) => {
    console.log(req.user)
    if (!req.user) {
      res.sendStatus(403)
      return
    }

    res.send(await getUser({userId: req.user.id}))
  }
)

module.exports = router