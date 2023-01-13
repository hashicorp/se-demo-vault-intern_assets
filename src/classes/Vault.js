/**
 * Copyright (c) HashiCorp, Inc.
 */

const axios = require("axios").default;
const signale = require("signale")
const vaultOptions = require("../config/vaultOptions.json");
const vault = require("node-vault")(vaultOptions);

module.exports = class Vault {
    // constructor(secretShares, secretThreshold) {
    //     vault.init({
    //         secret_shares: secretShares,
    //         secret_threshold: secretThreshold,
    //     })
    //     .then((result) => {
    //         signale.success("Vault Server Initialized!");

    //         const keys = result.keys;
    //         vault.token = result.root_token;
    //         return vault.unseal({
    //             secret_shares: secretShares,
    //             key: keys[0],
    //         });
    //     })
    //     .catch((err) => {
    //         signale.error(err);
    //     });
    // }

    /**
     * 
     * @param {String} text to be encrypted
     * @returns ciphertext from response
     */
    async encryptText(text) {

        return axios({
            method: "post",
            url: `${vaultOptions.endpoint}/v1/transit/encrypt/my-key`,

            headers : {
                'X-Vault-Token' : vaultOptions.token,
                'Content-Type' : "application/json",
            },

            data : {
                "plaintext": Buffer.from(text).toString("base64")
            }
        })
        .then((response) => {
            signale.success("Text Encrypted!");
            return response.data.data.ciphertext;
        })
        .catch((err) => {
            signale.error(err);
        });
    }

    async decryptText(cipherText) {
        return axios({
            method: "post",
            url: `${vaultOptions.endpoint}/v1/transit/decrypt/my-key`,

            headers : {
                'X-Vault-Token' : vaultOptions.token,
                'Content-Type' : "application/json",
            },

            data : {
                "ciphertext": cipherText
            }
        })
        .then((response) => {
            signale.success("Text Decrypted!");
            return response.data.data.plaintext;
        })
        .catch((err) => {
            signale.error("Couldn't Decrypt Text: " + err);
        });
    }

    // async encodeBase64(text) {
    //    return Buffer.from(text).toString("base64");
    // }

    // async encryptBase64(base64String) {
    //     await vault.write("transit/encrypt/my-key", {value: base64String});

    //     return vault.read("transit/encrypt/my-key");
    // }

}