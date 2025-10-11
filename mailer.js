import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendOtpEmail = (email, otp, res) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
      res.status(404).json({ success: false, message: "Failed to send❌" })
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        success: true,
        message: "Send OTP Successfully",
        data: otp
      });
    }
  });
};

export default sendOtpEmail;
