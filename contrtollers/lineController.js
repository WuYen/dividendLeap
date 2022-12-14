const router = require('express').Router();
const axios = require('axios');
const qs = require('qs');
const userModel = require('../models/UserInfo');

const LINE_NOTIFY_CLIENT_ID = 'bznJfBLs5gNEtwCpLC8EEa';
const LINE_NOTIFY_CLIENT_SECRET = 'ZdUToxuTlKWcVkx3UE1pVg9Nm6wVJXvqbNEJWNXHURH';

/* GET home page. */
router.get('/', function (req, res, next) {
  const user = req.query.user;
  res.redirect(
    `https://notify-bot.line.me/oauth/authorize?` +
      `response_type=code` +
      `&client_id=${LINE_NOTIFY_CLIENT_ID}` +
      `&redirect_uri=http://localhost:8050/line/callback` +
      `&scope=notify` +
      `&state=${user}`
  );
});

router.get('/callback', async function (req, res, next) {
  const code = req.query.code;
  const userAccount = req.query.state;
  console.log('callback ', `code:${code}, userAccount:${userAccount}`);

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:8050/line/callback',
      client_id: LINE_NOTIFY_CLIENT_ID,
      client_secret: LINE_NOTIFY_CLIENT_SECRET,
    }),
    url: 'https://notify-bot.line.me/oauth/token',
  };
  const oauthToken = await axios(options);

  try {
    console.log('oauthToken result', oauthToken.data);
    const userToken = oauthToken.data.access_token;
    let result = userModel.updateData({ account: userAccount }, { lineToken: userToken });

    return res.send(oauthToken.data);
  } catch (error) {
    console.log('conver error', error);
    return res.send({ error: 'connect error' });
  }
});

router.get('/send', async function (req, res, next) {
  const message = req.query.msg;
  const account = req.query.user;
  if (!message || !account) {
    throw new Error('need message or account');
  }
  const userInfo = await userModel.getData({ account: account });
  const token = userInfo && userInfo.lineToken;
  if (token) {
    throw new Error(account + ' does not have line token');
  }
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}` },
    data: qs.stringify({
      message: message,
    }),
    url: 'https://notify-api.line.me/api/notify',
  };
  const response = await axios(options);
  try {
    console.log('response result', response);
    return res.send(response.data);
  } catch (error) {
    console.log('send message fail', error);
    return res.send({ error: 'send message fail' });
  }
});

module.exports = router;
