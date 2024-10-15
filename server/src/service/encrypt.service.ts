import { Provide } from '@midwayjs/core';
import * as cryptoJS from 'crypto-js';
import { customAlphabet } from 'nanoid';
import * as pako from 'pako';

@Provide()
export class EncryptService {
  randomIdGenerator = customAlphabet('abcdefghijklmnopqrstuvwxyz123456789', 9);

  genRandomId(prefix: string) {
    return prefix + this.randomIdGenerator();
  }

  ungzip(gzipBase64Str: string) {
    return JSON.parse(
      pako.ungzip(Buffer.from(gzipBase64Str, 'base64'), { to: 'string' })
    );
  }

  gzip(data: unknown) {
    return this.strToGzipBase64(JSON.stringify(data));
  }

  strToGzipBase64(str: string) {
    return Buffer.from(pako.gzip(str, { level: 9 })).toString('base64');
  }
  comparePassword(p: string, hash: string) {
    return p === hash;
  }

  async encryptPassword(password) {
    return password;
  }

  md5(str: string) {
    return cryptoJS.MD5(str).toString();
  }

  md5Match(str: string, md5Str: string) {
    return cryptoJS.MD5(str).toString() === md5Str;
  }

  aesEncrypt(message: string) {
    return cryptoJS.AES.encrypt(message, '').toString();
  }

  aesDecrypt(encrypted) {
    return cryptoJS.AES.decrypt(encrypted, '').toString(cryptoJS.enc.Utf8);
  }
}
