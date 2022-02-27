const { Sequelize } = require('sequelize');
const { applyRelation } = require('./relation');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

const modelDefiners = [
    require('./models/Merchants'),
    require('./models/Products'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyRelation(sequelize);

module.exports = sequelize;