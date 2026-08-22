function toPublicUser(user) {
  const data = user.toJSON ? user.toJSON() : { ...user };
  delete data.passwordHash;
  return data;
}

module.exports = {
  toPublicUser
};
