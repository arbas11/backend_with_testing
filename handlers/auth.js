const bcrypt = require('bcrypt');
const { models } = require('../storage')

const loginInstruction = (req, res) => {
    res.status(200).json({
        id: "your username",
        password: "your password"
    });
};

const login = async (req, res, next) => {
    const { id, password } = req.body;
    if(!id && !password || password === undefined || id === undefined){
        return res.status(400).json({ error: "something wrong with the request" });
    }
    const merchant = await models.merchants.findOne({
        where: {
            id: id
        }
    });
    if (!merchant) {
        return res.status(401).json({ error: "wrong id or password try again" });
    }
    const { user_password } = merchant;
    const valid = await bcrypt.compare(password, user_password)
        if (valid) {
            res.cookie('uid', id)
            res.status(200).json({
            login: "successfully",
            acsess: "/merchant/:id/product",
            id: id,
            });
        }else{
            return res.status(400).json({ error: "wrong id or password try again" });
        }
};

const logout = (req, res) => {
    res.clearCookie('uid')
    return res.json({
        logout: "successfully",
    });
};

module.exports = {loginInstruction, login, logout}