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


async function update(req, res) {
  console.log("route update");
  await userCtrl.update(req);
  res.json({ });
}

async function deleteuser(req, res) {
  console.log("route deleteuser");
  await userCtrl.deleteuser(req);
  res.json({ });
}

async function get_menu_items(req, res) {
  menu = userCtrl.get_menu_items();
  res.json({ data: menu});
}

async function add_to_cart(req, res) {
  userCtrl.add_to_cart(req);
  res.json({ });
}

async function send_email(req, res) {
  userCtrl.send_email(req);
  res.json({ });
}