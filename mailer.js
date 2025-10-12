import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "loundryservices@gmail.com",
    pass: "cjcq cudv zail qsce",
  },
  connectionTimeout: 10000, // 10 seconds
});

const sendOtpEmail = (email, otp, res) => {
  const mailOptions = {
    from: "loundryservices@gmail.com",
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(404).json({ success: false, message: "Failed to send ❌", error })
    } else {
      res.status(200).json({
        success: true,
        message: "Send OTP Successfully",
        data: otp
      });
    }
  });
};

export default sendOtpEmail;
