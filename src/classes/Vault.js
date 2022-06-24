const axios = require("axios").default;
const signale = require("signale")
const vaultOptions = require("../config/vaultOptions.json");
const vault = require("node-vault")(vaultOptions);

signale.info(vaultOptions.endpoint);
signale.info(vaultOptions.token);


module.exports = class Vault {
    constructor(secretShares, secretThreshold) {
        vault.init({
            secret_shares: secretShares,
            secret_threshold: secretThreshold,
        })
        .then((result) => {
            signale.success("Vault Server Initialized!");

            const keys = result.keys;
            vault.token = result.root_token;
            return vault.unseal({
                secret_shares: secret_shares,
                key: keys[0],
            });
        })
        .catch((err) => {
            signale.error(err);
        })

        vault.write("transit/keys/my-key")
        .then(() => {
            signale.success("Named Encryption Key Created!")
        })
        .catch((err) => {
            signale.error("Couldn't create named encryption key: " + err)
        })
    }

    async encryptText(text) {

        axios({
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
        .then(() => {
            signale.success("Text Encrypted!");
        }).then((result) => {
            return {
                "cipherText" : result,
            }
        })
        .catch((err) => {
            signale.error(err);
        });

        
        // vault.write("transit/encrypt/my-key", {value: base64String})
        // .then(() => {
        //     signale.info("Entered read block.");
        //     // return cipherText;
        //     return vault.read("transit/encrypt/my-key");
        // })
        // .catch((err) => {
        //    throw new Error(err);
        // })

    }

    // async encodeBase64(text) {
    //    return Buffer.from(text).toString("base64");
    // }

    // async encryptBase64(base64String) {
    //     await vault.write("transit/encrypt/my-key", {value: base64String});

    //     return vault.read("transit/encrypt/my-key");
    // }

}