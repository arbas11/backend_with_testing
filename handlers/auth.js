const bcrypt = require("bcrypt");
const { models } = require("../storage");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXIPRY_SECOND = process.env.ACCESS_TOKEN_EXIPRY_SECOND;

const loginInstruction = (req, res) => {
  res.status(200).json({
    id: "your username",
    password: "your password",
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const userNameLower = username.toLowerCase();
  if (
    (!userNameLower && !password) ||
    password === undefined ||
    userNameLower === undefined
  ) {
    return res.status(400).json({ error: "something wrong with the request" });
  }
  const merchant = await models.merchants.findOne({
    where: {
      user_name: userNameLower,
    },
  });
  if (!merchant) {
    return res
      .status(401)
      .json({ error: "wrong username or password try again" });
  }
  const { user_password, id, fullname } = merchant;
  const valid = await bcrypt.compare(password, user_password);
  if (valid) {
    const token = await JWT.sign({ userNameLower }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXIPRY_SECOND,
    });
    res.status(200).json({
      login: "successfully",
      acsess: "/merchant/:id/product",
      token: token,
      id: id,
      fullname: fullname,
    });
  } else {
    return res
      .status(400)
      .json({ error: "wrong username or password try again" });
  }
};

const logout = (req, res) => {
  return res.json({
    logout: "successfully",
  });
};

module.exports = { loginInstruction, login, logout };
