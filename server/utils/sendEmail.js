const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Prevent self-signed cert issues in dev
      },
    });

    await transporter.sendMail({
      from: `"DurmusGym" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
    });

    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    return false;
  }
};

module.exports = sendEmail;
