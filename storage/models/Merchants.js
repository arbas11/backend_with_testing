const { DataTypes } = require('sequelize');

const merchants = (sequelize) => {
   sequelize.define('merchants',
   {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_num: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            underscored: true
        });
};

module.exports = merchants;
