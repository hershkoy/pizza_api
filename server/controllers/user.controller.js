const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const request = require('request');
const config = require('../config/config');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  street: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().required(),
})


module.exports = {
  insert,
  update,
  deleteuser,
  get_menu_items,
  add_to_cart,
  send_email
}

async function insert(user) {
  console.log("user contl insert");
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function update(req) {
  console.log("user contl update");
  user = req.user;

  let user_db = await User.findOne({ _id: user._id });
  user_db.street = req.body.street;
  user_db.fullname = req.body.fullname;
  await user_db.save();

  //console.log(`user_db:${JSON.stringify(user_db)}`);
  //return await new User(user).save();
}


async function deleteuser(req) {
  console.log("user contl deleteuser");
  user = req.user;
  let user_db = await User.findOne({ _id: user._id });
  await user_db.remove();

}


function get_menu_items() {
  console.log("get_menu_items");
  return [
    "Carbonara",
    "Frutti di Mare",
    "Quattro Formaggi",
    "Crudo",
    "Napoletana"
  ];
}

function add_to_cart(req) {
  data = JSON.parse(req.body.data);
  items = data.items;
  console.log(`add_to_cart:${JSON.stringify(items[0].product)}`);

  cart = new Cart();

  items.forEach(function (item){
    cart.items.push({
      productName: item.product,
      quantity: item.quantity,
      price: 10,  //should be taken from products table.
    });
  })

  cart.save();

}

function send_email(req){

  console.log(`send_email`);
  user = req.user;

  fullname = req.user.fullname;
  email = req.user.email;

  var options = {
      url: 'https://api.mailgun.net/v3/sandbox55379aa78c3445f380a1642dd9a6e843.mailgun.org/messages',
      method: 'POST',
      auth: {
          'user': 'api',
          'pass': config.mailgunKey
      },
      formData: 
       { from: 'Pizza <postmaster@sandbox55379aa78c3445f380a1642dd9a6e843.mailgun.org>',
         to: `${fullname} <${email}>`,
         subject: 'Here is your invoice',
         text: 'Congratulations!, your pizza delivery is on the way! You are truly awesome!' 
      }
    };
  
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
  });

}
