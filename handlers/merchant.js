const { models } = require('../storage');
const bcrypt = require('bcrypt');
const AppError = require('../utilities/appError');

const registerInstruction = (req, res) => {
    console.log('ini models dari register', models)
    res.status(200).json({
        post: "to - merchant/register to register merchant",
        id: "create your user name for login",
        user_name: "name of your merchant",
        user_password: "create your password",
        address: "enter your address",
        phone_num: "enter your phone number"
    });
};

const registerMerchant = async (req, res, next) => {
    const { id, user_name, user_password, address, phone_num } = req.body;
    if(!id && !user_name && !user_password && !phone_num){
        res.status(400).json({
            item: "all data must be provide"
        });
    }
    const hash = await bcrypt.hash(user_password, 10);
    await models.merchants.create({
        id: id,
        user_password: hash,
        user_name: user_name,
        address: address,
        join_date: Date.now(),
        phone_num: phone_num
    }).then(function(merchant){
        res.status(200).json({
            register: "successfully",
            acsess: "/merchant/:id/product",
            item: merchant
        });
    }).catch((error)=>{
        res.status(400).json({
            register: "unsuccessfully",
            item: "something wrong with request"
        });
    });
};
const getMerchantByid = async (req, res) => {
    const id = req.params.id
    const merchant = await models.merchants.findOne({
        where: {
            id: id
        }
    });
    if (merchant) {
        res.status(200).json(merchant);
    } else {
        res.status(404).json({
            register: "unsuccessfully",
            item: "something wrong with request"
        });
    }
};

const removeMerchant = async (req, res, next) => {
    const id = req.cookies.uid
    await models.merchants.destroy({
        where: {
            id: id
        }
    }).then(function(item){
        res.clearCookie('uid')
        return res.json({
            succsessfully: "delete merchant"
        })
    }).catch((error)=>{
    res.status(500).send('something went wrong')
    })
    res.status(200).json({ status: success })
};
module.exports = {registerMerchant, registerInstruction, getMerchantByid, removeMerchant}
