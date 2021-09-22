const nodemailer = require("nodemailer");
const OptionTemplate = {
  registration: Object.freeze({
    from: "astock0050@gmail.com",
    subject: "Stock registration validate",
    text: "Please click url to confirm your account, url: ",
  }),
  OTP: Object.freeze({
    from: "astock0050@gmail.com",
    subject: "Stock OTP QRCode",
    text: "Please scan your QRCode: ",
  }),
};
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "astock0050@gmail.com",
    pass: "Pass.123",
  },
});

function sendMail(mailAddress, Options) {
  let { ...context } = Options;
  context.to = mailAddress;
  transport.sendMail(context, (error, info) => {
    if (error) console.log(error);
    else console.log(`${target} mail sent` + info.response);
  });
}
module.exports = { sendMail, OptionTemplate };
