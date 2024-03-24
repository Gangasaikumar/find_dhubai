const key = "find-dubai-api";
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../common/config.json");
let myKey = crypto.createHash("sha1").update(key, "utf-8").digest();
myKey = myKey.slice(0, 16);

// encriptPassword
const encriptPw = (password) => {
  return new Promise((resolve) => {
    try {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(password, salt);
      resolve(hashedPassword);
    } catch (err) {
      console.log("error at psw encription::", err);
    }
  });
};

// validateEmail
const emailValidation = (email) => {
  return new Promise((resolve) => {
    try {
      resolve(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase()));
    } catch (err) {
      resolve(false);
      console.log("error at email validation::", err);
    }
  });
};

//verifyPassword
const verifyPassword = (enteredPSD, userPassword) => {
  return new Promise((resolve) => {
    try {
      const verify = bcrypt.compareSync(enteredPSD, userPassword);
      resolve(verify);
    } catch (err) {
      resolve(false);
    }
  });
};

// generate JWT tocken
const generateTocken = (userId) => {
  return new Promise((resolve) => {
    const user = { id: userId };
    const accessToken = jwt.sign(user, config.jwtSecret, { expiresIn: "8h" });
    resolve(accessToken);
  });
};

// verify JWT key
const verifyTocken = (jwtKey) => {
  return new Promise((resolve) => {
    jwt.verify(jwtKey, config.jwtSecret, (err, user) => {
      if (!err) resolve(user);
      else resolve(false);
    });
  });
};

// encript email
const encriptEmail = (email) => {
  return new Promise((resolve) => {
    const cipherChunks = [];
    let cipher = crypto.createCipheriv("aes-128-ecb", myKey, "");
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(email, "utf8", "base64"));
    cipherChunks.push(cipher.final("base64"));
    resolve(cipherChunks.join(""));
  });
};

// decript email
const decriptEmail = (email) => {
  return new Promise((resolve) => {
    const cipherChunks = [];
    let decipher = crypto.createDecipheriv("aes-128-ecb", myKey, "");
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(email, "base64", "utf8"));
    cipherChunks.push(decipher.final("utf8"));
    resolve(cipherChunks.join(""));
  });
};

// Epoch & Unix Timestamp Conversion Helper
const EpochTimeStamp = (date, callback) => {
  // date.setHours(00, 00, 00, 00);
  let timeStamp = Math.floor(date ? date.getTime() : new Date() / 1000);
  if (callback) {
    callback(timeStamp);
  } else {
    return new Promise((resolve, reject) => {
      try {
        resolve(timeStamp);
      } catch (err) {
        reject(0);
      }
    });
  }
};

module.exports = {
  encriptPw,
  emailValidation,
  verifyPassword,
  generateTocken,
  verifyTocken,
  encriptEmail,
  decriptEmail,
  EpochTimeStamp,
};
