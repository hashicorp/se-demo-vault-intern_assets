#!/bin/bash
# Copyright (c) HashiCorp, Inc.

# osascript -e "Terminal"
#     activate
#     do script "vault server -dev -dev-root-token-id=root"
# osascript -e "tell application \"Terminal\" to do script \"vault server -dev -dev-root-token-id=root\""
# sleep 3
# export VAULT_ADDR=http://127.0.0.1:8200
# vault secrets enable transit
# vault write -f transit/keys/my-key
# osascript -e "tell application \"Terminal\" to do script \"open http://localhost:3000/\""
# npm start

# vault write -f transit/keys/my-key

# set -euxo pipefail

# vault read transit/keys/my-key
# if [ $? -eq 0 ]
# then
#     echo "Key was successfully created"
#     exit 0
# else
#     echo "Failed to create key, are you sure the Transit Secrets Engine has been enabled?"
#     exit 1
# fi