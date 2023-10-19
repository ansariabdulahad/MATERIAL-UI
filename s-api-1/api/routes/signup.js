const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/react');
const User = require("../schema/user");
const Token = require("../services/token");

router.post('/', async function(request, response) {
  try {
    const newData = new User(request.body);
    const data = await newData.save();
    response.status(200);
    response.json({
      message: "success",
      token: Token.create(data)
    })
  }
  catch(err)
  {
    response.status(424);
    response.json({
      message: "Username already exist !"
    })
  }
});

module.exports = router;
