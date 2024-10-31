const regexConstant = {
  mongoObjectId: /^[0-9a-fA-F]{24}$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
  time: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
};

module.exports = regexConstant;
