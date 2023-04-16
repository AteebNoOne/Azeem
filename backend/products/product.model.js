const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        itemName: { type: DataTypes.STRING, allowNull: false },
        itemCategory: { type: DataTypes.STRING, allowNull: false },
        itemNumber: { type: DataTypes.STRING, allowNull: false },
        oldItemNumber: { type: DataTypes.STRING },
        itemTotalWeight: { type: DataTypes.FLOAT },
        itemLength: { type: DataTypes.FLOAT },
        itemBreadth: { type: DataTypes.FLOAT },
        itemHeight: { type: DataTypes.FLOAT },
        materialLength: { type: DataTypes.FLOAT },
        materialBreadth: { type: DataTypes.FLOAT },
        materialHeight: { type: DataTypes.FLOAT },
        secondaryImageUrl: { type: DataTypes.STRING }
    };

    const options = {
        // enable timestamp fields (createdAt and updatedAt)
        timestamps: true, 
        // set the name of the table to 'products'
        tableName: 'products',
        // set the default order of records to be returned in ascending order of item number
        defaultScope: {
            order: [['itemNumber', 'ASC']]
        },
        scopes: {
            // include all fields with this scope
            withAllFields: { attributes: {} }
        }        
    };

    return sequelize.define('products', attributes, options);
}
