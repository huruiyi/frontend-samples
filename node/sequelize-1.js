import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect : 'sqlite',
  storage : ':memory:',
});
const User = sequelize.define('User', {
  username : DataTypes.STRING,
  birthday : DataTypes.DATE,
});


await sequelize.sync(); // creates the tables in the database


const jane = await User.create({
  username: 'janedoe',
  birthday: new Date(1980, 6, 20),
});
console.log(jane.toJSON());

const users = await User.findAll();
console.log(users);

// const sequelize = new Sequelize('sqlite::memory:');
// const User = sequelize.define('User', {
//   username : DataTypes.STRING,
//   birthday : DataTypes.DATE,
// });


// const jane = await User.create({ firstName: 'Jane', lastName: 'Doe' });
// console.log("Jane's auto-generated ID:", jane.id);
