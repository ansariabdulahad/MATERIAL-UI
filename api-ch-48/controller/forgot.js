const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/react');
const User = require("../schema/user");
const Verification = require("../schema/verification");
const { sendMail } = require("../services/email");
const bcrypt = require('bcrypt');

const checkUser = async (request,response)=>{
  let verif = code();
  const data = request.body;
  const user = await User.findOne(data);
  if(data.email && user)
  {
    const receipt = {
      to: data.email,
      subject: "Verification Code",
      message: "Your verification code is "+verif
    }
    const isSend = await sendMail(receipt);
    if(isSend)
    {
      let tmp = new Verification({
        email: data.email,
        code: verif
      });
      await tmp.save();
      response.status(200);
      response.json({
        message: "success"
      });
    }
    else {
      response.status(409);
      response.json({
        message: "unable to send email"
      });
    }
  }
  else {
    response.status(404);
    response.json({
      message: "user not found"
    });
  }
}

const code = ()=>{
  let result;
  for(let i=0;i<4;i++)
  {
    let random = Math.floor(Math.random() * 10);
    if(i===0)
    {
      result = random.toString();
    }
    else {
      result += random.toString();
    }
  }
  return result;
}

const forgot = async (request,response)=>{
  let update = request.body;
  update['isVerified'] = false;
  const isDone = await Verification.findOne(update);
  if(update.email && update.code && update.password && isDone)
  {
    const isFinal = await changePassword(update);
    if(isFinal)
    {
      response.status(200);
      response.json({
        message: "password changed"
      })
    }
    else {
      response.status(409);
      response.json({
        message: "password not changed"
      })
    }
  }
  else {
    response.status(409);
    response.json({
      message: "verification failed"
    })
  }
}

const changePassword = async (data)=>{
  data['isVerified'] = true;
  data['password'] = await bcrypt.hash(data.password.toString(), 12);
  let query = {
    email: data.email,
    isVerified: false,
    code: data.code
  }
  await Verification.updateOne(query,{isVerified:true});
  await User.updateOne({
    email: data.email
  },{
    password: data.password
  });
  return true;
}

module.exports = {
  checkUser,
  forgot
}
