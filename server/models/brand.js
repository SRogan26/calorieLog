module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('brand', {
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    Brand.associate = function (models) {
        Brand.hasMany(models.item, {
            foreignKey: 'brand_id'
        })
    };
    return Brand;
}
