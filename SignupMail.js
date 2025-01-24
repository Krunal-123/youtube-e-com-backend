const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const signupMail = (email,firstName,lastName) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Welcome to Our Platform!',
    html: `
  <h2>Dear ${firstName},</h2>
  <img scr="https://i.ytimg.com/vi/_knbWxxFuz8/maxresdefault.jpg" style="height:300px; width:100%;">
  <p>
  Welcome to Your our own E Com Website! We’re thrilled to have you join our community. Whether you’re here to [mention key feature or benefit of the site], explore our resources, or connect with like-minded individuals, we’re here to support you every step of the way.
</p>
  <p>
  To help you get started, we’ve put together a quick guide that covers the essentials. If you have any questions or need assistance, our support team is just an email away at youtube.com.
</p>
  <ul>
    <li>Explore and enjoy our features.</li>
    <li>Stay tuned for updates and new releases.</li>
    <li>Feel free to reach out to us with any questions or feedback.</li>
  </ul>
  <p>Thank you for signing up! If you have any questions, don't hesitate to contact us.</p>
  <p>Best regards,<br/>The YouTube E Com Team</p>
`,

  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending welcome email:', error);
    } else {
      console.log('Welcome email sent: ' + info.response);
    }
  });
};

module.exports = signupMail;
