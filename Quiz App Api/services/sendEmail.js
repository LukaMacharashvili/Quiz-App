import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.CLOUD_CLIENT_ID,
  process.env.CLOUD_CLIENT_SECRET
);
OAuth2Client.setCredentials({ refresh_token: process.env.CLOUD_REFRESH_TOKEN });

const accessToken = OAuth2Client.getAccessToken();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "macharashvililuka12@gmail.com",
    clientId: process.env.CLOUD_CLIENT_ID,
    clientSecret: process.env.CLOUD_CLIENT_SECRET,
    refreshToken: process.env.CLOUD_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

function sendVerificationEmail(to, userId, userToken) {
  const mailOptions = {
    from: "Quiz App Project <macharashvililuka12@gmail.com>",
    to: to,
    subject: "Email Verification",
    text: "Email Verification",
    html: `<p>Dear User, please verify your email for Quiz App project.</p>
        <p>
            This <a href="https://protected-inlet-59376.herokuapp.com/api/auth/verify/${userId}/${userToken}">link</a> will verify your email address.
        </p>
        <p>
            If you did not registered on Quiz App project, you can just ignore this message and do not click on the link!
        </p>`,
  };

  transport.sendMail(mailOptions, function (error, result) {
    if (error) {
      return error;
    } else {
      return result;
    }
    transport.close();
  });
}

function sendPasswordResetEmail(to, userId, resetToken) {
  const mailOptions = {
    from: "Quiz App Project <macharashvililuka12@gmail.com>",
    to: to,
    subject: "Password Reset",
    text: "Password Reset",
    html: `<p>Dear User, you requested password reset.</p>
        <p>
            This <a href="https://quiz-b385b.web.app/resetpassword/${userId}/${resetToken}">link</a> will help you to reset your password.
        </p>
        <p>
            If it was not you, who requested password reset, you can just ignore this message and do not click on the link!
        </p>`,
  };
  transport.sendMail(mailOptions, function (error, result) {
    if (error) {
      return error;
    } else {
      return result;
    }
    transport.close();
  });
}

function sendNewQuizEmail(to, quizId) {
  const mailOptions = {
    from: `Quiz App Project <macharashvililuka12@gmail.com>`,
    to: to,
    subject: "New Quiz",
    text: "New Quiz",
    html: `<p>Dear User, Here is the new Quiz for you!</p>
        <p>
          <a href="https://quiz-b385b.web.app/takequiz/${quizId}">Link</a> for the Quiz.
        </p>`,
  };
  transport.sendMail(mailOptions, function (error, result) {
    if (error) {
      return error;
    } else {
      return result;
    }
    transport.close();
  });
}

export { sendVerificationEmail, sendPasswordResetEmail, sendNewQuizEmail };
