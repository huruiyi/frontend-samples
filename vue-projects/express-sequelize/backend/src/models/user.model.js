const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      // bcrypt 哈希，禁止明文落库；默认查询不返回该字段
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
      }
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['passwordHash']
        }
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ['passwordHash']
          }
        }
      }
    }
  );

  return User;
};
