# Innovation Lab Project

## Overview

This demonstration explores the core benefits of Vault's Transit Secrets Engine. We visit 3 different scenarios you may encounter in order to leverage the engine. 

- Scenario 1: Introduction to the Transit Secrets Engine
- Scenario 2: Unencrypted Web Application and Database
- Scenario 3: Encrypted Web Application and Database

| Resource | Description |
|----------|:------------|
| Platform | [Instruqt][1] |
| Documentation | Encryption as a Service - [Demo Guide][2] |
| Slides | Encryption as a Service - [Presentation][3] |
| Recording | Encryption as a Service - [Recording][4] |
| GitHub Assets | Encryption as a Service - [Assets][5] |
| Contributors | Anthony Benjamin, Syed Quadri, George Abot |


## Description

Project demonstrates deploying a web application that allows end-user to register/login into the page. When a user registers, their data is processed through Vault OSS, more specifically, using Vault Transit Secrets Engine. This Engine allows us to encrypt/decrypt data, at any given point. In the scope of this project, we send the password to Vault, where it's encrypted. After this stage, the encrypted password is stored in MongoDB, alongside the username in plain text. 

## Getting Started

### Dependencies

* [Node.js](https://nodejs.dev/download)
* [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installing

* Clone repository in a directory of your choice.
```
$ git clone https://github.com/hashanthony/internvault.git
```

### Executing program

* Change directory to the repo you cloned on your local machine.
```
$ cd internvault/
```

* Create a .env file under the root directory.

**MacOS/Linux**
```
$ touch .env
```

**Windows**
```
$ type nul > .env
``` 

* In your newly created .env file, store your MongoDB connection URL, and port 3000. If you would like to use the unencrypted version of the application, you can set PORT to 3001.
```
MONGO_URL="<YOUR_MONGO_URL>"
PORT=3000
```

* In /legacy, run command:
```
$ bash vault.sh
```
**That's it, very simple.**

## Authors

Anthony Benjamin

George Abot

Syed Quadri

## Contributions
* https://codepen.io/patrikhjelm/pen/nEKvzv

[1]: <https://play.instruqt.com/hashicorp/tracks/encryption-as-a-service> "Encyption as a Service - Instruqt Track"
[2]: <https://docs.google.com/document/d/1XFHnyoIBxCUC6yKq2lDr9hai8B6-dfNjGhQVweu9YmY/edit?usp=sharing> "Encryption as a Service - Vault Transit Secrets Engine Documentation"
[3]: <https://docs.google.com/presentation/d/1DhUmu_bh32tohvc_ON33MY_yEOKnE_jE8KRcvUYfJQA/edit?usp=sharing> "Encryption as a Service - Vault Transit Secrets Engine Presentation"
[4]: <TBD> "Encryption as a Service - Video Walkthrough"
[5]: <TBD> "ENcryption as a Service - Assets"
[6]: <https://hashicorp.wufoo.com/forms/field-requests-products-assets> "Field Request form"
[7]: <https://hashicorp.slack.com/archives/CGYB4R3NX> "proj-instruct"