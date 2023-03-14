const express = require("express")
const passport = require("passport")
const bcrypt = require("bcrypt")
const { body, validationResult } = require('express-validator');
const prisma = require("../database");
const getUser = require("../serializers/user");
const sendToSlack = require("../notifications/slack");
const { sendEmail } = require("../notifications/email");
const { generateToken } = require("../utils/token");

const router = express.Router()

const SALT_ROUNDS = 12

// POST /api/auth/register
router.post(
  "/register",
  body("name"),
  body("email").isEmail().custom(async email => {
    const user = await prisma.user.findUnique({where: {email}})
    if (!user) return true
    throw new Error("Email is already in use")
  }),
  body("password").isLength({min: 8}), // TODO: There is also isStrongPassword for checking symbols, upper/lowercase etc
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const {name, email, password, confirmPassword, discountCode, source} = req.body

    if (password !== confirmPassword) {
      res.status(400).send({error: "Passwords don't match"})
    }

    bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
      if (err) res.status(400).send({error: {password: "Password is invalid"}})

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          discountCode,
        },
        select: {
          name: true,
          id: true,
          email: true,
        }
      })
      
      req.login(user, async (err) => {
        if (err) res.sendStatus(400) // TODO: Add logging here
        res.send(await getUser({userId: user.id}))
      })

      /*
      TODO: Send registration/new user email
        sendEmail()
      */

      sendToSlack({text: `New user registered! 🎉🙌 \nEmail: ${req.user.email}, Source: ${source}`})
    });
  }
)

router.post(
  "/forgot-password",
  body("email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const {email} = req.body

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    const now = new Date()
    now.setMinutes(now.getMinutes() - 3)
    const minuteInPast = now

    if (user && (!user.passwordResetAt || user.passwordResetAt < minuteInPast)) {
      const passwordResetToken = await generateToken({ stringBase: "hex", byteLength: 50 })
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          passwordResetToken,
          passwordResetAt: new Date().toISOString(),
        }
      })

      /*await sendEmail({
        templateId: "",
        personalizations: [{
          to: email,
          dynamic_template_data: {
            action_url: `https://example.com/app/reset-password/${passwordResetToken}`
          }
        }]
      })*/
    }

    res.send({status: "OK"})
  }
)

router.post(
  "/reset-password",
  body("password").isLength({min: 8}), // There is also isStrongPassword for checking symbols, upper/lowercase etc
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  body("resetToken").exists(),
  async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const {password, confirmPassword, resetToken} = req.body

    if (password !== confirmPassword) {
      res.status(400).send({error: "Passwords don't match"})
    }

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: resetToken
      }
    })

    const now = new Date()
    now.setHours(now.getHours() + 1)
    const hourInPast = now

    if (!user || user.passwordResetAt > hourInPast) {
      res.status(400).send({errors: {password: {msg: "This token has expired, please request a new one"}}})
    }

    bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
      if (err) res.status(400).send({error: {password: "Password is invalid"}})

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          password: hash,
          passwordResetToken: null
        },
        select: {
          name: true,
          id: true,
          email: true,
        }
      })
      
      req.login(user, async (err) => {
        if (err) res.sendStatus(400) // TODO: Add logging here
        res.send({status: "OK"})
      })
    });
  }
)

// POST /api/auth/login
router.post(
  "/login",
  passport.authenticate("local"),
  async (req, res) => {
    const { id } = req.user
    res.send(await getUser({userId: id}))
    //res.redirect("/")
  }
)

// GET /api/auth/logout
router.get("/logout", (req, res) => {
  req.logout()
  res.sendStatus(200)
})

module.exports = router