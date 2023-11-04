const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ansariabdulahad3@gmail.com',
    pass: 'zllvgqjlwtepgfky'
  }
});

const sendMail = async (data) => {
  var mailOptions = {
    from: 'ansariabdulahad3@gmail.com',
    to: data.to,
    subject: data.subject,
    text: data.message
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  }
  catch (err) {
    return false;
  }
}

module.exports = {
  sendMail
}
