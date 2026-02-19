const userService = require('../services/userService');

exports.getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};

exports.registerUser = (req, res) => {
  const userData = req.body;
  const newUser = userService.registerUser(userData);
  res.status(201).json(newUser);
};
