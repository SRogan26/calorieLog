module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('person', {
            person_id: {
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
        return Person;
}
