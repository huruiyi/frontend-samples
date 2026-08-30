# Whisper Notes

项目包含：

- `spark-template`：React/Radix UI 前端，负责加密、解密、Markdown 编辑与安全预览。
- `spark-template-backend`：Express/TypeORM/MySQL 后端，只保存密文。

先在 `spark-template-backend` 执行 `docker compose up -d` 和 `npm run dev`，再在 `spark-template` 执行 `npm run dev -- --host 127.0.0.1`。

打开 `http://127.0.0.1:5000`，设置至少 12 个字符的加密密码。保险库 ID 会显示在左下角，可与加密密码一起用于其他设备解锁。
