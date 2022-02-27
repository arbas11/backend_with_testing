function applyRelation(sequelize) {
    const { merchants, products} = sequelize.models;

    merchants.hasMany(products, { foreignKey: 'merchant_id' });
    products.belongsTo(merchants);

}

module.exports = { applyRelation };