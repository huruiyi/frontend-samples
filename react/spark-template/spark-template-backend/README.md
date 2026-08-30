# spark-template-backend

Express + TypeORM + MySQL 的 Whisper Notes 密文存储服务。后端不接收加密密码，也不具备解密笔记的密钥。

## 本地启动

本机 3306 已有 MySQL 服务且不接受项目账号，因此项目自带隔离的 MySQL 8.4 容器，映射到 `127.0.0.1:3307`，不会修改现有 MySQL。

```powershell
docker compose up -d
npm install
npm run db:check
npm run dev
```

服务地址为 `http://127.0.0.1:3100`，健康检查为 `/api/health`。TypeORM 启动时自动执行迁移。

数据库配置位于本机 `.env`：数据库 `fairy_vip_notes`，用户 `fairy-vip`，密码 `fairy-vip`，端口 `3307`。`.env` 已被 `.gitignore` 排除。

## 存储内容

`vaults` 保存盐值、加密的密钥校验块、加密的访问令牌和令牌 SHA-256 哈希。`notes` 只保存随机 ID、AES-GCM IV、密文、版本和时间戳。笔记标题和正文不会以明文进入数据库。

`GET /api/v1/vaults` 按创建时间返回数据库中的保险库 ID；它不会返回明文保险库名称、密码、令牌或密钥。前端只有在用户输入正确密码并成功解密后，才能显示保险库名称。

访问令牌由浏览器随机生成，并使用加密密码派生的密钥包裹；普通 CRUD 必须携带令牌，后端使用恒定时间比较校验其哈希。
