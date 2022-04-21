const { DataTypes } = require("sequelize");

const products = (sequelize) => {
  sequelize.define(
    "products",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        allowNull: false,
        type: DataTypes.BIGINT,
        validate: {
          min: 0,
        },
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      category: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING,
        defaulValue:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJEK40TRPKbM5JcPw1M6F8ayHInpCGrTNSrg&usqp=CAU",
      },
    },
    {
      underscored: true,
    }
  );
};

module.exports = products;
