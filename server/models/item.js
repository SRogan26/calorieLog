const brand = require("./brand");

module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('item', {
            item_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            calories : {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fat : {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            carbs : {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            protein : {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            brand_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: brand,
                    key: 'brand_id'
                }
            }
        }, {
            timestamps: false
        });
        Item.associate = function(models){
            Item.belongsTo(models.brand, {
                foreignKey: 'brand_id'
            });
            Item.hasMany(models.log_entry, {
                foreignKey: 'item_id'
            })
        };
        return Item;
}