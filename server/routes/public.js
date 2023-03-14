const express = require("express")
const { body } = require('express-validator');

const prisma = require("../database");
const sendToSlack = require("../notifications/slack");

const router = express.Router()

// POST api/public/mailingList
router.post(
  "/mailingList",
  body("email").exists(),
  async (req, res) => {
    const {email} = req.body

    await prisma.mailingList.upsert({
      create: {
        email
      },
      update: {
        email
      },
      where: {
        email
      }
    })

    sendToSlack({text: `New early-access sign up!\nEmail: ${email}`})

    res.send({status: "OK"})
  }
)

module.exports = router