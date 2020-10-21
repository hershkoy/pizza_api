const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/update').post(asyncHandler(update));
router.route('/delete').post(asyncHandler(deleteuser));

router.route('/get_menu_items').get(asyncHandler(get_menu_items));
router.route('/add_to_cart').post(asyncHandler(add_to_cart));
router.route('/send_email').post(asyncHandler(send_email));

/**
 * @swagger
 * /user/update:
 *   post:
 *     description: Change user data
 *     parameters:
 *        - in: header
 *          name: authorization
 *          required: true
 *          type: string
 *          description: jwt token (from login)
 *        - in: query
 *          name: street
 *          required: true
 *          schema:
 *             type: string
 *          description: new street to change to
 *        - in: query
 *          name: fullname
 *          required: true
 *          schema:
 *             type: string
 *          description: new fullname to change to
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
async function update(req, res) {
  console.log("route update");
  await userCtrl.update(req);
  res.json({ });
}

/**
 * @swagger
 * /user/deleteuser:
 *   post:
 *     description: will delete current user
 *     parameters:
 *        - in: header
 *          name: authorization
 *          required: true
 *          type: string
 *          description: jwt token (from login)
 *     responses:
 *        "200":
 *           description: operation successful
 */
async function deleteuser(req, res) {
  console.log("route deleteuser");
  await userCtrl.deleteuser(req);
  res.json({ });
}

/**
 * @swagger
 * /user/get_menu_items:
 *   get:
 *     description: get pizza menu items
 *     parameters:
 *        - in: header
 *          name: authorization
 *          required: true
 *          type: string
 *          description: jwt token (from login)
 *     responses:
 *        "200":
 *           description: list of menu items 
 */
async function get_menu_items(req, res) {
  menu = userCtrl.get_menu_items();
  res.json({ data: menu});
}

/**
 * @swagger
 * /user/add_to_cart:
 *   post:
 *     description: allow user to add items to shopping cart
 *     parameters:
 *        - in: header
 *          name: authorization
 *          required: true
 *          type: string
 *          description: jwt token (from login)
 *        - in: query
 *          name: data
 *          required: true
 *          schema:
 *             type: string
 *          description: json stirng of items to add to cart ({"items":[{"product":"Carbonara","quantity":1}]})
 *     responses:
 *        "200":
 *           description: operation successful
 */
async function add_to_cart(req, res) {
  userCtrl.add_to_cart(req);
  res.json({ });
}

/**
 * @swagger
 * /user/send_email:
 *   post:
 *     description: send email to logged in user
 *     parameters:
 *        - in: header
 *          name: authorization
 *          required: true
 *          type: string
 *          description: jwt token (from login)
 *     responses:
 *        "200":
 *           description: operation successful
 */
async function send_email(req, res) {
  userCtrl.send_email(req);
  res.json({ });
}