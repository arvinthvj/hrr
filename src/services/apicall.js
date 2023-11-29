import API from './axioservice';
import nacl_factory from 'js-nacl';
import { CryptographyKey, SodiumPlus } from 'sodium-plus';
import {
  keyEnv,
  nonceEnv,
  tenantinActiveApiResCode700,
} from '../assets/constants/config';
import { _doLogout } from '../components/commonMethod';

// const nonceEnv = 'c88529b087036c035be110e0fa5b6b63041ede30e2e69e90'
// const keyEnv = '89def69f0bdddc995078037539dc6ef4f0bdbdd3fa04ef2d11eea30779d72ac6'
async function decryptMessage(ciphertextHex, nonceHex, keyHex) {
  let sodium;
  if (!sodium) sodium = await SodiumPlus.auto();
  let ciphertext = Buffer.from(ciphertextHex, 'hex');
  let nonce = Buffer.from(nonceHex, 'hex');
  let key = CryptographyKey.from(keyHex, 'hex');
  return sodium.crypto_secretbox_open(ciphertext, nonce, key);
}

export const postData = async (
  url,
  data,
  sucessCallBack,
  methodType = 'post',
) => {
  nacl_factory.instantiate(function (sodium) {
    const formData = new FormData();
    if (Object.keys(data)?.length > 0) {
      var keyUtf8 = sodium.from_hex(
        process.env.REACT_APP_KEY_CODE || keyEnv,
        'hex',
      );
      var nonceUtf8 = sodium.from_hex(
        process.env.REACT_APP_NONCE_CODE || nonceEnv,
        'hex',
      );
      var dataUtf8 = sodium.encode_utf8(JSON.stringify(data));
      var encrypted = sodium.crypto_secretbox(dataUtf8, nonceUtf8, keyUtf8);
      const encryptedHex = sodium.to_hex(encrypted);
      formData.append('request_data', encryptedHex);
    }
    if (methodType == 'post') {
      return new Promise((resolve, reject) => {
        API.post(url, formData)
          .then(res => {
            if (
              res?.data?.code == tenantinActiveApiResCode700 ||
              // || (res?.data?.code == "204" && res?.data?.message !== "Invalid Tenant")
              (res?.data?.code == '204' &&
                res?.data?.message == 'Unauthorized') ||
              (res?.data?.code == '204' && res?.data?.message == '') ||
              (res?.data?.code == '204' && res?.data?.message == 'unauthorized')
            ) {
              _doLogout();
            } else {
              if (res?.data?.data && res?.data?.data.length > 0)
                getData(res?.data?.data, sucessCallBack, res);
              else {
                sucessCallBack([], res);
              }
            }
            // resolve(res?.data?.data)
          })
          .catch(error => {
            sucessCallBack([], error);
            reject(error);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        API.get(url, formData)
          .then(res => {
            if (
              res?.data?.code == tenantinActiveApiResCode700 ||
              // || (res?.data?.code == "204" && res?.data?.message !== "Invalid Tenant")
              (res?.data?.code == '204' &&
                res?.data?.message == 'Unauthorized') ||
              (res?.data?.code == '204' && res?.data?.message == '') ||
              (res?.data?.code == '204' && res?.data?.message == 'unauthorized')
            ) {
              _doLogout();
            } else {
              if (res?.data?.data && res?.data?.data.length > 0)
                getData(res?.data?.data, sucessCallBack, res);
              else {
                sucessCallBack([], res);
              }
            }
            // resolve(res?.data?.data)
          })
          .catch(error => {
            sucessCallBack([], error);
            reject(error);
          });
      });
    }
  });
};

export const getData = (data, sucessCallBack, res) => {
  const nonceHex = process.env.REACT_APP_NONCE_CODE || nonceEnv;
  const keyHex = process.env.REACT_APP_KEY_CODE || keyEnv;
  return new Promise((resolve, reject) => {
    try {
      decryptMessage(data, nonceHex, keyHex).then(plaintext => {
        const result = new TextDecoder().decode(plaintext);
        sucessCallBack(JSON.parse(result), res);
        resolve(JSON.parse(result));
      });
    } catch (error) {
      sucessCallBack([], error);
      reject(error);
    }
  });
};

export const DataEncrpt = async (data, sucessCallBack) => {
  nacl_factory.instantiate(function (sodium) {
    if (Object.keys(data)?.length > 0) {
      var keyUtf8 = sodium.from_hex(
        process.env.REACT_APP_KEY_CODE || keyEnv,
        'hex',
      );
      var nonceUtf8 = sodium.from_hex(
        process.env.REACT_APP_NONCE_CODE || nonceEnv,
        'hex',
      );
      var dataUtf8 = sodium.encode_utf8(JSON.stringify(data));
      var encrypted = sodium.crypto_secretbox(dataUtf8, nonceUtf8, keyUtf8);
      const encryptedHex = sodium.to_hex(encrypted);
      sucessCallBack(encryptedHex);
    }
  });
};
export const getDecryptedData = (data, sucessCallBack, res) => {
  const nonceHex = process.env.REACT_APP_NONCE_CODE || nonceEnv;
  const keyHex = process.env.REACT_APP_KEY_CODE || keyEnv;
  return new Promise((resolve, reject) => {
    try {
      decryptMessage(data, nonceHex, keyHex).then(plaintext => {
        const result = new TextDecoder().decode(plaintext);
        sucessCallBack(JSON.parse(result), res);
        resolve(JSON.parse(result));
      });
    } catch (error) {
      sucessCallBack([], error);
      reject(error);
    }
  });
};
