const nodeMailer = require("nodemailer");
const { MAIL_ACCOUNT, MAIL_PASSWORD } = require("../utility/config");
const officalGMail = MAIL_ACCOUNT;
const contentTemplate = {
  registration: {
    subject: "Stock Account Validation",
    content: (param) =>
      `<h1 style="
        color: rgba(0, 0, 0, 0.6); 
        text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2), 0px -5px 35px rgba(255, 255, 255, 0.3)"
      >StockOverFlow</h1>
      <p>Please click url to confirm your account, url: <a href="${param[0]}">here</a></p>
      `,
  },
  OTP: {
    subject: "Stock OTP QRCode",
    content: (param) => `Please scan your QRCode: ${param[0]}`,
  },
};

const transport = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_ACCOUNT,
    pass: MAIL_PASSWORD,
  },
});

function sendMail(mailAddress, { subject, content }, ...additional) {
  let mailFormat = {
    from: officalGMail,
    to: mailAddress,
    subject: subject,
    html: content(additional),
  };
  transport.sendMail(mailFormat, (error, info) => {
    if (error) console.log(error);
    else console.log(`${target} mail sent` + info.response);
  });
}
module.exports = { sendMail, contentTemplate };
