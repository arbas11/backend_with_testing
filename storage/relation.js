function applyRelation(sequelize) {
  const { merchants, products } = sequelize.models;

  merchants.hasMany(products, {
    foreignKey: "merchant_id",
    onDelete: "cascade",
  });
  products.belongsTo(merchants, {
    onDelete: "cascade",
  });
}

module.exports = { applyRelation };
