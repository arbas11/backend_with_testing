const { models } = require('../storage');
const AppError = require('../utilities/appError');

const getAllProduct = async (req, res) => {
    const id = req.params.id
    const products = await models.products.findAll({
        where: {
            merchant_id: id
        }
    });
    if (products) {
        res.status(200).json(products);
    } else {
        res.status(404).json({
            item: "wrong user id or unauthorized user"
        });
    }
};

const getProductByID = async (req, res, next) => {
        const { prodid, id } = req.params;
        const product = await models.products.findOne({
            where: {
                id: prodid,
                merchant_id: id
            }
        });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({
                item: "Product doesn't exist"
            });
        }
};
const addNewProduct = async (req, res) => {
    const { id } = req.params;
    const {name, quantity, price} = req.body;
    if (req.body.id) {
        res.status(400).send({ error: "id should not be provided, since it is determined automatically by the database" })
    } else {
        const id = req.cookies.uid
        await models.products.create({
            "name": name,
            "quantity": quantity,
            "price": price,
            "merchant_id": id
        }).then(function(item){
            res.status(200).json({
                status: {
                    add: "successfully added!"
                },
                product:{
                    item
                }
            })
        }).catch((error)=>{
            res.status(500).json({
                error: "something went wrong"})
        })

    }

};

const updateProduct = async (req, res) => {
    const { name, quantity, price } = req.body;
    const { prodid } = req.params;
    const id = req.cookies.uid

    await models.products.update({
        "name": name,
        "quantity": quantity,
        "price": price
    }, {
        where: {
            id: prodid,
            merchant_id: id
        }
    }).then((product)=>{
        res.status(200).json({
            instruction: {
                status: "sucessfully update"
            },
            product:{
                product
            }})
        }).catch((error)=>{
        res.status(500).json({
            error: "something went wrong"})
    })
};

const removeProduct = async (req, res) => {
    const { prodid } = req.params;
    const id = req.cookies.uid
    await models.products.destroy({
        where: {
            id: prodid,
            merchant_id: id
        }
    }).then((item)=>{
        res.status(200).json({
            instruction: {
                status: "sucessfully delete"
            },
            product:{
                item
            }
        })
        }).catch((error)=>{
            res.status(500).json({
                error: "something went wrong"})
    })
    res.status(200).json({ success: true })
};

module.exports = {getAllProduct, getProductByID, addNewProduct, updateProduct, removeProduct}