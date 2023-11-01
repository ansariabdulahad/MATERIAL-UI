const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'justforcodeservice.com',
    pass: 'gihvhdpnrxkaiifr'
  }
});

const sendMail = async (data)=>{
  var mailOptions = {
    from: 'justforcodeservice.com',
    to: data.to,
    subject: data.subject,
    text: data.message
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  }
  catch(err)
  {
    return false;
  }
}

module.exports = {
  sendMail
}
