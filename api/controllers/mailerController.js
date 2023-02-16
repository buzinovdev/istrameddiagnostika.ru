const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})
module.exports.contact = async (req, res) => {
  const {subject, name, email, phone, date, services} = req.body
  let info = await transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to: process.env.MAIL_TO,
    subject: subject,
    //text: message,
    html: `
      <body 
        style="margin: 0;
        background-color: #279FAF;
        color: #ffffff;
        font-size: 18px;
        padding: 24px;
        border-radius: 12px;
        "
      >
        <div style="margin-bottom: 24px; font-size: 32px; font-weight: 700;">Медицинский центр «Диагностика и лечение»</div>
        <div style="line-height: 38px;">
          Клиент
          <strong style="padding: 6px 12px; background-color: rgba(0,0,0,0.2); border-radius: 12px; margin: 0 5px;">${name}</strong> 
          хочет записать на прием к
          <strong style="padding: 6px 12px; background-color: rgba(0,0,0,.2); border-radius: 12px; margin: 0 5px;">${services.toLowerCase()}</strong> 
          на
          <strong style="padding: 6px 12px; background-color: rgba(0,0,0,.2); border-radius: 12px; margin: 0 5px;">${date}</strong>
        </div>
        <div style="margin-top: 32px; color: #ffffff; font-weight: 700; font-size: 22px;">Контактные данные</div>
        <div style="margin-top: 8px; color: #ffffff;">
          <span style="margin-right: 12px;">Телефон:</span>${phone}
        </div>
        <div style="margin-top: 8px; color: #ffffff !important;">
          <span style="margin-right: 12px;">Почта:</span>${email}
        </div>
      </body>
    `
  })
  if (info.messageId) {
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: 'Письмо отправлено'})
  } else {
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Письмо не отправлено'})
  }
}