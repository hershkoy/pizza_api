const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Use to register a user
 *     parameters:
 *        - in: query
 *          name: email
 *          required: true
 *          schema:
 *             type: string
 *          description: user email
 *        - in: query
 *          name: password
 *          required: true
 *          schema:
 *             type: string
 *          description: user password
 *        - in: query
 *          name: fullname
 *          schema:
 *             type: string
 *          description: user fullname
 *        - in: query
 *          name: street
 *          schema:
 *             type: string
 *          description: user street
 *     responses:
 *        "200":
 *           description: operation successful 
 */
async function register(req, res, next) {
  console.log("route register");
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
}

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Use to register a user
 *     parameters:
 *        - in: query
 *          name: email
 *          required: true
 *          schema:
 *             type: string
 *          description: user email
 *        - in: query
 *          name: password
 *          required: true
 *          schema:
 *             type: string
 *          description: user password
 *     responses:
 *        "200":
 *           description: operation successful
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                   description: The user ID.
 *               token:
 *                   description: The jwt token.
 */
function login(req, res) {
  console.log("route login");
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}


