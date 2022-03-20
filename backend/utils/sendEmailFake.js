import nodemailer from 'nodemailer';
import { parse } from './handlebarsMailTemplate.js';

export const sendMailFake = ({
  to,
  from,
  subject,
  templateData,
}) => {
console.log('reject')

  return new Promise<boolean>((resolve, reject) => {
    nodemailer.createTestAccount().then(async (account) => {
      
      console.log(account)
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      transporter.sendMail(
        {
          from: {
            name: from?.name || 'egemme',
            address: from?.email || 'jordansumitomo@example.com',
          },
          to: {
            name: to.name,
            address: to.email,
          },
          subject: subject,
          html: await parse(templateData),
        },
        (err, info) => {
          console.log('Message sent', info.messageId);

          if(err){
            console.log(err)
            console.log('error here 40')
          }
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL', nodemailer.getTestMessageUrl(info));
          resolve(true);
        }
      );
    });
  });
};
