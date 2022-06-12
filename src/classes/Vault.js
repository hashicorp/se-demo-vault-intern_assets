// import signale from "signale"
// const vaultOptions = require("../../config/vaultOptions.json");
// const vault = require("node-vault")(vaultOptions);

// export default class Vault {
//     constructor() {
//         vault.init({secret_shares: 1, secret_threshold: 1})
//         .then((result) => {
//             const keys = result.keys;
//             //set token for all following requests
//             vault.token = result.root_token;
//             //unseal vault server
//             return vault.unseal({secret_shares: 1, key: keys[0]})
//         }).catch((err) => {
//             signale.error(err);
//         })
//     }

// }