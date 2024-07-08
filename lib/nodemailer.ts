import nodemailer from "nodemailer";

interface SetPassword {
  email: string;
  verificationToken: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendSetPasswordEmail({
  email,
  verificationToken,
}: SetPassword) {
  const info = await transporter.sendMail({
    from: '"TouchType" <noreply@touch-type.com>',
    to: email,
    subject: "Set Password",
    text: "Please set a password for you account to use credentials login",
    html: `
      <p>Please set a password to use credential login. Click the below button or copy paste the url into a new tab.</p>
      <a href="${process.env.AUTH_URL}/auth/login/set-password?token=${verificationToken}&email=${email}" 
         style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">
        Set Password
      </a>
      <p>${process.env.AUTH_URL}/auth/login/set-password?token=${verificationToken}</p>
    `,
  });

  if (info.messageId) {
    return { success: true };
  } else {
    return { success: false };
  }
}
