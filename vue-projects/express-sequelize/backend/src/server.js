require('./config/env');
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // alter: true 用于同步新增 password_hash 等字段；已有旧数据且无密码列时建议重建库
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

bootstrap();
