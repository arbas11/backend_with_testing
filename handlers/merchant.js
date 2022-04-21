const { models } = require("../storage");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");

const registerInstruction = (req, res) => {
  console.log("ini models dari register", models);
  res.status(200).json({
    post: "to - merchant/register to register merchant",
    id: "create your user name for login",
    user_name: "name of your merchant",
    user_password: "create your password",
    address: "enter your address",
    phone_num: "enter your phone number",
  });
};

const registerMerchant = async (req, res, next) => {
  const { username, password, address, phonenumber, fullname } = req.body;
  if (!username && password && !phonenumber) {
    return res.status(400).json({
      item: "all data must be provide",
    });
  }
  const hash = await bcrypt.hash(password, 10);
  await models.merchants
    .create({
      id: uuid(),
      user_password: hash,
      user_name: username,
      fullname: fullname,
      address: address,
      phone_num: phonenumber,
    })
    .then(function (merchant) {
      res.status(200).json({
        register: "successfully register user, sign in to see your account",
        acsess: "/merchant/:id/product",
        id: merchant.id,
        user_name: merchant.user_name,
        fullname: merchant.fullname,
        address: merchant.address,
        phone_num: merchant.phone_num,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        register: "unsuccessfully",
        item: "user already exist",
      });
    });
};

const getMerchantByid = async (req, res) => {
  const id = req.params.id;
  const merchant = await models.merchants.findOne({
    where: {
      id: id,
    },
  });
  if (merchant) {
    const data = {
      id: merchant.id,
      username: merchant.user_name,
      fullname: merchant.fullname,
      address: merchant.address,
      phonenumber: merchant.phone_num,
      profilepic: merchant.profilepic,
    };
    res.status(200).json(data);
  } else {
    console.log("no merchant");
    return res.status(404).json({
      register: "unsuccessfully",
      item: "something wrong with request",
    });
  }
};

const removeMerchant = async (req, res) => {
  const id = req.params.id;

  await models.merchants
    .destroy({
      where: {
        id: id,
      },
    })
    .then(function (item) {
      return res.status(200).json({
        msg: "sucessfully delete merchant",
        data: item,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: "something went wrong" });
    });
};
module.exports = {
  registerMerchant,
  registerInstruction,
  getMerchantByid,
  removeMerchant,
};
