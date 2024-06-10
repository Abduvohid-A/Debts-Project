const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.email.gmail",
  port: 587,
  secure: true, 
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});


export async function sendOtp(email, otp) {

  const info = await transporter.sendMail({
    to: email, 
    subject: "Verification", 
    text: "", 
    html: `<h1>Your One Time Password <br> ${otp}</h1>`
  });
};