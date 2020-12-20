import nodemailer from 'nodemailer';
import { createActivationMail } from '../../resources/notifications/RegisterReader';
import { FRONTEND_URL, MAIL_FROM, MAIL_USERNAME, MAIL_PASSWORD } from '../config/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

const send = (userEmail: string, processID: string) => {
  const { subject, html } = createActivationMail(FRONTEND_URL, processID);
  const mailOptions = {
    from: MAIL_FROM,
    to: userEmail,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export default { send };
