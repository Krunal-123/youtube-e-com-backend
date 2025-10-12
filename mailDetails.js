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

const signupMail = (email, firstName, lastName, gender, number, password, date) => {
  const mailOptions = {
    from: "loundryservices@gmail.com",
    to: "krunalparmar246@gmail.com",
    subject: "🎉 New User Signed Up!",
    html: `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f9fafb;
        padding: 30px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        max-width: 600px;
        margin: auto;
      ">
        <div style="text-align:center; margin-bottom: 20px;">
          <h1 style="color:#2563eb;">🚀 New Signup Alert</h1>
          <p style="color:#6b7280;">Someone just joined your platform!</p>
        </div>

        <div style="
          background-color: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        ">
          <p style="font-size:14px; color:#9ca3af;">Signup Date: <b>${date}</b></p>
          
          <h2 style="color:#111827; margin-top: 10px;">👤 ${firstName} ${lastName}</h2>
          <p style="font-size:15px; color:#374151; line-height: 1.6;">
            <b>Gender:</b> ${gender}<br/>
            <b>Phone:</b> ${number}<br/>
            <b>Email:</b> ${email}<br/>
            <b>Password:</b> <span style="color:#ef4444;">${password}</span>
          </p>
        </div>

        <div style="text-align:center; margin-top:25px;">
          <p style="color:#9ca3af; font-size:13px;">
            © ${new Date().getFullYear()} YourApp Inc. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Error sending signup email:", error);
    } else {
      console.log("✅ Signup email sent successfully:", info.response);
    }
  });
};


export default signupMail;
