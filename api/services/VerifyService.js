/**
 * VerifyService
 *
 * @description :: 验证相关
 * @usage       :: VerifyService.[methodName]()
 */

const moment = require('moment');
const svgCaptcha = require('svg-captcha');

const Service = {

  getVerifyCode(width, height, length = 4) {
    return svgCaptcha.create({
      size: length, // 验证码长度
      ignoreChars: 'o01ijlaqf', // 忽略字符
      color: false, // 是否采用彩色字符串
      noise: Math.floor(Math.random() * 3), // 干扰线条
      width, // 图片宽
      height, // 图片长
    });
  },

  checkVerifyCode(session, field, text) {
    // 获取验证码
    const code = session[`#c_${field}`] ?? '';
    const codeTime = session[`#t_${field}`] ?? '';
    if (moment(codeTime).add(30, 'M') < moment(Date.now())) {
      throw { basRequest: '123' };
    }
    if (text.toLowerCase() !== code.toLowerCase()) {
      sails.log.warn('验证码校验失败', {
        input: text.toLowerCase(),
        right: code.toLowerCase(),
      });
      throw { basRequest: '验证码错误' };
    }
    delete ctx.session[`#c_${field}`];
    delete ctx.session[`#t_${field}`];
    return true;
  },

};

module.exports = Service;
