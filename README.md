<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

# TodoListBackend-NestJS

## 开发环境

`pnpm:7.30.0` + `MongoDB:6.0.5` + `Node.js:18.14.0`

## 快速开始

### 设置 JWT KEY 与短信服务密钥

**注意：**
不要将密钥提交到版本控制中，因为它是敏感信息。

使用阿里云短信服务，需要在 `.env` 文件中设置 `ACCESS_KEY_ID` 和 `ACCESS_KEY_SECRET` 两个环境变量。

`.secret.env` 文件中的密钥将用于生成 JWT 令牌。

```env
JWT_SECRET="555555"
ACCESS_KEY_ID="含短信服务权限的accessKeyId"
ACCESS_KEY_SECRET="含短信服务权限的accessKeySecret"
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
