# ✨ API Server Boilerplate

- [✨ API Server Boilerplate](#-api-server-boilerplate)
- [🍎 Intro](#-intro)
    - [Authentication](#authentication)
    - [Validation](#validation)
    - [Docs](#docs)
    - [Env Example](#env-example)
- [🚗 run](#-run)
- [📚 Library](#-library)
- [🎋 Structure](#-structure)

# 🍎 Intro
### Authentication
  * Login
  * Register
  * User
  * Admin

### Validation
  * User validation
  * Auth validation

### Docs
  * Swagger

### Env Example
```
MONGODB_URL= mongodb connection url

PORT=3000

JWT_SECRET=anything
```


# 🚗 run
```
yarn start
```

# 📚 Library
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

# 🎋 Structure
```
├── .env.example
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── README.md
├── package.json
├── server.js
├── src
│   ├── config
│   │   └── conn.js
│   ├── controllers
│   │   ├── auth
│   │   │   ├── auth.controller.js
│   │   │   └── auth.validator.js
│   │   ├── file.controller.js
│   │   └── user
│   │       ├── user.controller.js
│   │       └── user.validator.js
│   ├── docs
│   │   └── docs.swagger.js
│   ├── models
│   │   └── User.model.js
│   ├── routes
│   │   ├── auth.routes.js
│   │   ├── file.routes.js
│   │   └── user.routes.js
│   ├── utils
│   │   ├── errorMessage.js
│   │   ├── jwt.config.js
│   │   ├── protected.js
│   │   ├── response.js
│   │   └── securePassword.js
│   └── view
│       └── serverRunning.html
├── uploads
│   └── LOCAL_FILE_UPLOADS
└── yarn.lock
```