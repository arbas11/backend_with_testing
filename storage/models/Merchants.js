const { DataTypes } = require("sequelize");

const merchants = (sequelize) => {
  sequelize.define(
    "merchants",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_num: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilepic: {
        type: DataTypes.STRING,
        defaultValue:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
    },
    {
      underscored: true,
    }
  );
};

module.exports = merchants;
