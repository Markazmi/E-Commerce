const nodemailer=require('nodemailer')

const sendEmail = async(options)=>{
    // copied from https://mailtrap.io/inboxes/1594223/messages
    var transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        }
      });
      const message ={
          from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
          to:options.email,
          subject:options.subject,
          text:options.message,
      };
      transporter.sendMail(message);
}

module.exports=sendEmail;