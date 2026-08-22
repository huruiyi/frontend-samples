# Express + MySQL + Sequelize + Vue

项目结构：

```
express-sequelize/
├── backend/          # Express + Sequelize API
├── frontend/         # Vue 3 + Vite + Vue Router + Pinia
├── scripts/          # Windows 一键脚本
├── docker-compose.yml
└── README.md
```

---

## 1. 环境配置

后端仅使用两个环境文件（位于 `backend/`）：

| 文件 | 用途 |
| --- | --- |
| `.env.development` | 本地开发 |
| `.env.production` | 生产部署 |

根据 `npm` 脚本自动识别：`npm run dev` → development，`npm start` → production。

### `.env.development`（本地开发）

```env
PORT=13000

# MySQL（与 docker-compose 中 mysql 服务一致）
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=express_demo
DB_USER=root
DB_PASSWORD=fairy-vip
DB_DIALECT=mysql

# Redis（与 docker-compose 中 redis 服务一致）
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT 认证
JWT_SECRET=express-sequelize-dev-secret-change-me
JWT_EXPIRES_IN=7d
```

---

## 2. Docker 启动 MySQL + Redis

`docker-compose.yml` 位于项目根目录，配置与 `backend/.env.development` 对齐。

### 服务对照表

| 服务 | 容器名 | 宿主机端口 | 配置来源 |
| --- | --- | --- | --- |
| MySQL 8.0 | `express-demo-mysql` | `3306` | `DB_*` |
| Redis 7 | `express-demo-redis` | `6379` | `REDIS_*` |

| MySQL 配置项 | 值 |
| --- | --- |
| 主机 | `127.0.0.1` |
| 端口 | `3306` |
| 数据库 | `express_demo` |
| 用户 | `root` |
| 密码 | `fairy-vip` |

| Redis 配置项 | 值 |
| --- | --- |
| 主机 | `127.0.0.1` |
| 端口 | `6379` |
| 密码 | 无（空） |
| DB | `0` |

### 前置条件

1. 已安装并启动 **Docker Desktop**
2. 本机 `3306`、`6379` 端口未被占用

### 启动命令（推荐）

在项目根目录 `express-sequelize` 执行：

```bash
# 后台启动 MySQL + Redis
docker compose up -d

# 查看容器状态（应看到 mysql / redis 为 running 或 healthy）
docker compose ps

# 查看日志（Ctrl+C 退出跟随）
docker compose logs -f mysql
docker compose logs -f redis
docker compose logs -f

# 进入 MySQL 客户端验证
docker exec -it express-demo-mysql mysql -uroot -pfairy-vip -e "SHOW DATABASES;"

# 进入 Redis 验证
docker exec -it express-demo-redis redis-cli ping
# 期望输出：PONG
```

### 停止命令

```bash
# 停止并移除容器（保留数据卷）
docker compose down

# 停止并移除容器 + 数据卷（会清空 MySQL/Redis 数据）
docker compose down -v
```

### 使用 scripts 脚本（Windows）

```bash
# 在 express-sequelize 目录下
scripts\docker-up.bat        # 启动 MySQL + Redis
scripts\docker-ps.bat        # 查看状态
scripts\docker-logs.bat      # 跟随日志
scripts\docker-down.bat      # 停止（保留数据）
scripts\docker-down-v.bat    # 停止并清空数据
```

MySQL 首次启动大约需要 **10~20 秒** 才能接受连接。若后端报 `ECONNREFUSED 127.0.0.1:3306`，请稍等后重试，或执行：

```bash
docker compose ps
docker compose logs mysql
```

---

## 3. 后端启动

```bash
cd backend
npm install
npm run dev      # 开发模式，端口 13000
npm start        # 生产模式，端口以 .env.production 为准
```

或使用脚本：

```bash
scripts\backend-install.bat
scripts\backend-dev.bat
scripts\backend-start.bat
```

健康检查：`http://localhost:13000/api/health`

> 若表结构已从无密码升级，建议重建库后再启动：`scripts\docker-down-v.bat` → `scripts\docker-up.bat`

### 认证与安全

| 能力 | 说明 |
| --- | --- |
| 密码存储 | `bcrypt`（cost=12）哈希写入 `password_hash`，接口永不返回密码 |
| 登录凭证 | JWT（`Authorization: Bearer <token>`） |
| 密码规则 | 至少 8 位，且同时包含字母和数字 |

#### 认证接口

| 方法 | 路径 | 鉴权 | 说明 |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | 否 | 注册并返回 token |
| POST | `/api/auth/login` | 否 | 登录并返回 token |
| GET | `/api/auth/me` | 是 | 当前登录用户 |

注册：

```bash
curl -X POST http://localhost:13000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Tom\",\"email\":\"tom@example.com\",\"password\":\"Passw0rd\"}"
```

登录：

```bash
curl -X POST http://localhost:13000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"tom@example.com\",\"password\":\"Passw0rd\"}"
```

当前用户：

```bash
curl http://localhost:13000/api/auth/me ^
  -H "Authorization: Bearer <token>"
```

#### 用户 CRUD（均需登录）

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/users` | 创建用户（body 需含 password） |
| GET | `/api/users` | 用户列表 |
| GET | `/api/users/:id` | 用户详情 |
| PUT | `/api/users/:id` | 更新（可改 password，会重新哈希） |
| DELETE | `/api/users/:id` | 删除 |

```bash
curl http://localhost:13000/api/users ^
  -H "Authorization: Bearer <token>"
```

创建/更新用户请求体示例：

```json
{
  "name": "Tom",
  "email": "tom@example.com",
  "password": "Passw0rd"
}
```

---

## 4. 前端启动

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

或使用脚本：

```bash
scripts\frontend-install.bat
scripts\frontend-dev.bat
scripts\frontend-build.bat
```

> 请使用 `frontend/`，不要用 `vite-project/`（空模板）。

前端开发模式通过 Vite 代理将 `/api` 转发到 `http://localhost:13000`。

---

## 5. 脚本目录一览（`scripts/`）

| 脚本 | 说明 |
| --- | --- |
| `setup.bat` | 一键：Docker 启动 + 安装前后端依赖 |
| `docker-up.bat` | 启动 MySQL + Redis |
| `docker-down.bat` | 停止容器（保留数据） |
| `docker-down-v.bat` | 停止并清空数据卷 |
| `docker-ps.bat` | 查看容器状态 |
| `docker-logs.bat` | 跟随 MySQL/Redis 日志 |
| `backend-install.bat` | 安装后端依赖 |
| `backend-dev.bat` | 启动后端开发服务 |
| `backend-start.bat` | 启动后端生产服务 |
| `frontend-install.bat` | 安装前端依赖 |
| `frontend-dev.bat` | 启动前端开发服务 |
| `frontend-build.bat` | 构建前端生产包 |

---

## 6. 快速开始（完整流程）

### 方式 A：命令行

```bash
# 0. 进入项目根目录
cd C:\Users\hurui\Desktop\spring\express-sequelize

# 1. 启动 MySQL + Redis
docker compose up -d

# 2. 等待 MySQL 就绪（约 15 秒），确认状态
docker compose ps

# 3. 后端
cd backend
npm install
npm run dev

# 4. 另开终端：前端
cd C:\Users\hurui\Desktop\spring\express-sequelize\frontend
npm install
npm run dev
```

### 方式 B：脚本

```bash
cd C:\Users\hurui\Desktop\spring\express-sequelize

# 首次：安装依赖 + 启动 Docker
scripts\setup.bat

# 终端 1：后端
scripts\backend-dev.bat

# 终端 2：前端
scripts\frontend-dev.bat
```

访问地址：

- 后端：`http://localhost:13000`
- 前端：`http://localhost:5173`
