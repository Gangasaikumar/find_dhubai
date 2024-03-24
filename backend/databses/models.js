const mongoose = require("mongoose");
const db = require("../databses/mongo_connect").db;
mongoose.pluralize(null);

/**
 *  user_register
 */
const user_register_schema = new mongoose.Schema(
  {
    fn: { type: String, required: false }, //first name
    ln: { type: String, required: false }, //last name
    eml: { type: String, required: false, default: "" }, // email id
    mob: { type: Number, required: false, default: 0 }, //mobile number
    pwd: { type: String, required: false }, // password
    ev: { type: Number, required: false, default: 0 }, //email verified null / 0 - not verified; 1 - verified
    mv: { type: Number, required: false, default: 0 }, //mobile verified null / 0 - not verified; 1 - verified
    ut: { type: Number, required: false, default: 0 }, // 0 - client 1 - admin
    rd: { type: Number, required: true }, //registered date
    sts: { type: Number, required: false, default: 1 }, // status 0 - inactive, 1 - active
  },
  { versionKey: false }
);
user_register_schema.path("eml").index({ unique: true });
const user_register = db.model("users", user_register_schema);

/**
 *  user_address
 */
const user_address_schema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    door: { type: String, required: true },
    locality: { type: String, required: true },
    village: { type: String, required: false, default: "" },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: Number, required: true },
    default: { type: Boolean, required: false, default: false },
  },
  { versionKey: false }
);
user_address_schema.path("pin").index({ unique: false });
user_address_schema.path("user_id").index({ unique: false });
const user_address = db.model("address", user_address_schema);

/**
 *  products
 */
const products_schema = new mongoose.Schema({
    brand: {type: "String",required: true },
    model: { type: "String",required: true},
    imageurl: { type: "String", required: true},
    price: {
      type: "Number", required: true},
    network: {
        technology: { type: "String",required: true},
      speed: { type: "String", required: true},
    },
    body: {
      dimensions: {type: "String",required: true },
      weight: {type: "String",required: true},
      build: {type: "String",required: true},
      sim: {type: "String",required: true},
    },
    display: {
      type: { type: "String",required: true},
      size: {type: "String",required: true},
      Resolution: {type: "String",required: true },
      protection: {type: "String",required: true},
    },
    platform: {
      os: {type: "String",required: true},
      Chipset: {type: "String",required: true},
      CPU: {type: "String",required: true},
      GPU: {type: "String",required: true },
    },
    camara: {
      type: {type: "String",required: true},
      Features: {type: "String",required: true},
      Video: {type: "String",required: true},
    },
  },
  { versionKey: false }
);
products_schema.path("brand").index({ unique: false });
const products = db.model("products", products_schema);

module.exports = {
  user_register,
  user_address,
  products,
};