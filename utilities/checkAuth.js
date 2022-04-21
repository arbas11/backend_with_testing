const JWT = require("jsonwebtoken");

const isLogin = (req, res, next) => {
  if (!req.cookies.uid) {
    return res.status(401).json({
      error: "unautorized",
    });
  }
  next();
};
const isOwner = (req, res, next) => {
  const { id } = req.params;
  const usrid = req.cookies.uid;
  if (id !== usrid) {
    return res.status(401).json({
      error: "You my friend not allowed to do that!",
    });
  }
  next();
};
const isToken = async (req, res, next) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).json({
      errors: "no token found",
    });
  }

  try {
    const user = await JWT.verify(token, ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    return res.status(400).json({
      errors: "invalid Token",
    });
  }
};

module.exports = { isLogin, isOwner, isToken };
