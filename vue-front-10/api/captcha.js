const express = require('express');
const svgCaptcha = require('svg-captcha');
const router = express.Router();

router.get('/generate', (req, res) => {
  const captcha = svgCaptcha.create({
    size: 4,
    noise: 1,
    width: 150,
    height: 50,
  });
  req.session.captcha = captcha.text; // 将验证码文本存储在 session 中，以便后续验证
  res.type('svg');
  res.send(captcha.data);
});

module.exports = router;