import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';

import { parse } from './handlebarsMailTemplate.js';

const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY || 'default',
  })
);

export const sendMailReal = async ({
  to,
  from,
  subject,
  templateData,
}) => {
  await transporter.sendMail({
    from: {
      name: from?.name || 'egemme',
      address: from?.email || 'jordansumitomo@gmail.com',
    },
    to: {
      name: to.name,
      address: to.email,
    },
    subject: subject,
    html: await parse(templateData),
  });
};
