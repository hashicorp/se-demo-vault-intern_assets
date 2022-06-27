#!/bin/bash
vault server -dev -dev-root-token-id=root
export VAULT_ADDR=http://127.0.0.1:8200
vault secrets enable transit
vault write -f transit/keys/my-key
npm start