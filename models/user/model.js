const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "userinfo",
  new Schema({
    account:   String,
    password:  String,
    name:      String,
    role:      Number,
    email:     String,
    status:{  
      activity:   Number,
      login:{
        islogin:   Boolean,
        ispwreset: Boolean
      }
    },
    mystock: Array
  })
);

module.exports = model;
