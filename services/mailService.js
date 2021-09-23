const nodemailer = require("nodemailer");
const { MAIL_ACCOUNT, MAIL_PASSWORD } = require("../utility/config");
const officalGMail = "astock0050@gmail.com";
const contentTemplate = {
  registration: {
    subject: "Stock Account Validation",
    content: ({ url }) =>
      `<div
      style="
        width: 100%;
        height: 500px;
        border: 3px ridge black;
        background: seagreen;
        align-items: center;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      "
    >
      <h1
        style="
          color: rgba(0, 0, 0, 0.6);
          text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2), 0px -5px 35px rgba(255, 255, 255, 0.3);
        "
      >
        StockOverFlow
      </h1>
      <div style="width: 100%">
        <p>Please click url to confirm your account, url: ${url}</p>
      </div>
    </div>
    `,
  },
  OTP: {
    subject: "Stock OTP QRCode",
    content: ({ QRCode }) => `Please scan your QRCode: ${QRCode}`,
  },
};

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_ACCOUNT,
    pass: MAIL_PASSWORD,
  },
});

function sendMail(mailAddress, { subject, content }, ...additional) {
  let mailFormat = {
    From: officalGMail,
    To: mailAddress,
    subject: subject,
    html: content(additional),
  };
  transport.sendMail(mailFormat, (error, info) => {
    if (error) console.log(error);
    else console.log(`${target} mail sent` + info.response);
  });
}
module.exports = { sendMail, contentTemplate };
