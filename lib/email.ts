"use server";

import nodemailer from "nodemailer";

export type EmailType = {
  from: string;
  to: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_EMAIL_APP_PASS,
  },
});

export async function sendEmail({ from, to, subject, message }: EmailType) {
  const mailData = {
    to: to,
    subject: `[이메일 인증] 회원가입 인증번호`,
    from: from,

    html: `
    <h1>${subject}</h1>
    <div>${message}</div>
    </br>
    <p>보낸사람 : ${from}</p>
    `,
  };

  return transporter.sendMail(mailData);
}
