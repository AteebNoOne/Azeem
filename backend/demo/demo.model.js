const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Username: { type: DataTypes.STRING(255), allowNull: false },
        Password: { type: DataTypes.STRING(255), allowNull: false },
        Email: { type: DataTypes.STRING(255), allowNull: false },
        Phone: { type: DataTypes.STRING(20) },
        EmailOtp: { type: DataTypes.STRING(6), allowNull: true },
        SMSOtp: { type: DataTypes.STRING(6), allowNull: true },
        EmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
        SMSVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
        CompanyRegistered: { type: DataTypes.BOOLEAN, defaultValue: false }
    };
    
    const options = {
        // enable timestamp fields (createdAt and updatedAt)
        timestamps: true, 
        // set the name of the table to 'demo'
        tableName: 'demo',
        // set the default order of records to be returned in ascending order of item number
        defaultScope: {
            order: [['Username', 'ASC']]
        },
        scopes: {
            // include all fields with this scope
            withAllFields: { attributes: {} }
        }        
    };

    return sequelize.define('demo', attributes, options);
}
