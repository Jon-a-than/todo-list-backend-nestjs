<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# TodoListBackend-NestJS

## 开发环境

`pnpm:7.30.0` + `MongoDB:6.0.5` + `Node.js:18.14.0`

## 快速开始

### 设置 JWT KEY

**注意：**
不要将密钥提交到版本控制中，因为它是敏感信息。

```bash
$ echo JWT_SECRET="<密钥>" > '.secret.env'
```

### 启动项目

```bash
$ pnpm i

$ pnpm run start:dev
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 接口开发文档

[APIFOX](https://www.apifox.cn/web/invite?token=tcoiS-8rkbLuoBzMhq81x)
