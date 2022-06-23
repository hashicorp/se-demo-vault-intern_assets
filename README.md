# Innovation Lab Project

Web application user authentication, utilizing Vaults' Transit Secrets Engine.

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

* In your newly created .env file, store your MongoDB connection URL.
```
MONGO_URL="<YOUR_MONGO_URL>"
```

* In the root directory of internvault/, run command:
```
$ npm start
```
**That's it, very simple.**

## Authors

Anthony Benjamin

George Abot

Syed Quadri
