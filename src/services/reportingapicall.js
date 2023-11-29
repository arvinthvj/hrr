import REPORTING_API from "./reportingaxioservice";
import nacl_factory from "js-nacl";
import { CryptographyKey, SodiumPlus } from "sodium-plus";
import {
  keyEnv,
  nonceEnv,
  tenantinActiveApiResCode700,
} from "../assets/constants/config";
import { _doLogout } from "../components/commonMethod";

async function decryptMessage(ciphertextHex, nonceHex, keyHex) {
  let sodium;
  if (!sodium) sodium = await SodiumPlus.auto();
  let ciphertext = Buffer.from(ciphertextHex, "hex");
  let nonce = Buffer.from(nonceHex, "hex");
  let key = CryptographyKey.from(keyHex, "hex");
  return sodium.crypto_secretbox_open(ciphertext, nonce, key);
}

export const postData = async (url, data,signal, sucessCallBack) => {
    return new Promise((resolve, reject) => {
      REPORTING_API.post(url, data,{signal})
        .then((res) => {
          // if (
          //   res?.data?.code == tenantinActiveApiResCode700 ||
          //   (res?.data?.code == "204" &&
          //     res?.data?.message == "Unauthorized") ||
          //   (res?.data?.code == "204" && res?.data?.message == "") ||
          //   (res?.data?.code == "204" && res?.data?.message == "unauthorized")
          // ) {
          //   _doLogout();
          // } else {
           
          // }
          if(sucessCallBack) sucessCallBack(res, res);
          resolve(res)
        })
        .catch((error) => {
          if(sucessCallBack) sucessCallBack("error", error);
          reject(error);
        });
    });
};

export const getData = (url,sucessCallBack) => {
  return new Promise((resolve, reject) => {
    REPORTING_API.get(url)
      .then((res) => {
        sucessCallBack(res, res);
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

