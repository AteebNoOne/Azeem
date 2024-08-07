const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' 
        ,    
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    db.Demo = require('../demo/demo.model')(sequelize);
    db.Product = require('../products/product.model')(sequelize);
    
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    
    await sequelize.sync();
}