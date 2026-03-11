import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_PORT === "587" ? false : true,
  auth: {
    user: process.env.SMTP_USER || "abhishekkannur31@gmail.com",
    pass: process.env.SMTP_PASS || process.env.MAIL_PASS || "http://localhost:3000",
  },
});
export default transporter;
