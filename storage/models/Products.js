const { DataTypes } = require('sequelize');

const products = (sequelize) => {
    sequelize.define('products',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            quantity: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    min: 0,
                }
            },
            price: {
                allowNull: false,
                type: DataTypes.BIGINT,
                validate: {
                    min: 0,
                }
            },
            // We also want it to have a 'merchantId' field, but we don't have to define it here.
            // It will be defined automatically when Sequelize applies the associations
        },
        {
            underscored: true
        });
};

module.exports = products