import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "loundryservices@gmail.com",
    pass: "cjcq cudv zail qsce",
  }
});

const signupMail = async (email, firstName) => {
  const mailOptions = {
    from: `loundryservices@gmail.com`,
    to: email,
    subject: "🎉 Welcome to YouTube Services!",
    html: `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f6f9fc; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      
      <img src="https://i.ytimg.com/vi/_knbWxxFuz8/maxresdefault.jpg" alt="Welcome" 
        style="width: 100%; height: auto; display: block;">
      
      <div style="padding: 25px;">
        <h2 style="color: #333; margin-bottom: 10px;">Hey ${firstName}, welcome aboard 👋</h2>
        <p style="font-size: 15px; color: #555; line-height: 1.6;">
          We're <b>thrilled</b> to have you on <b>YouTube E-Com</b>!  
          Whether you're here to explore new products, enjoy deals, or just vibe with our community — you’re in the right place.
        </p>

        <div style="margin: 20px 0; text-align: center;">
          <a href="https://youtube.com" 
            style="background-color: #e53935; color: #fff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; display: inline-block;">
            Explore Now 🚀
          </a>
        </div>

        <ul style="color: #444; font-size: 15px; line-height: 1.8;">
          <li>🔍 Discover trending collections</li>
          <li>💬 Connect with creators</li>
          <li>🛒 Shop smarter and faster</li>
        </ul>

        <p style="font-size: 14px; color: #777; margin-top: 25px;">
          Need help? Reach us anytime at <a href="mailto:${process.env.EMAIL}" style="color: #e53935;">support@youtube-ecom.com</a>.
        </p>

        <p style="color: #555; margin-top: 30px;">Stay awesome,<br><strong>The YouTube E-Com Team ❤️</strong></p>
      </div>
    </div>
  </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

export default signupMail;