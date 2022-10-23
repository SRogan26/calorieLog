const item = require("./item");
const person = require("./person");

module.exports = (sequelize, DataTypes) => {
    const LogEntry = sequelize.define('log_entry', {
        entry_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            time_log: {
                type: DataTypes.DATE,
                allowNull: false
            },
            item_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: item,
                    key: 'item_id'
                }
            },
            person_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: person,
                    key: 'person_id'
                }
            }
        }, {
            timestamps: false
        });
        LogEntry.associate = function(models){
            LogEntry.belongsTo(models.item, {
                foreignKey: 'item_id'
            })
            LogEntry.belongsTo(models.person, {
                foreignKey: 'person_id'
            })
        };
        return LogEntry;
}