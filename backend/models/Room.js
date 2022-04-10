const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title : {
                type : Sequelize.STRING(200),
                allowNull : false
            },
            report : {
                type : Sequelize.ENUM('Y', 'N'),
                allowNull : false,
                defaultValue : 'N'
            },
            createdAt : {
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW
            }
        }, {
            sequelize,
            timestamps: false,  // createAt, updateAt 자동생성
            underscored: false, // 기본 카멜표기법 true면 카멜표기법 false면 스네이크표기법
            paranoid: false, // deleteAt 자동생성(soft delete)
            modelName: 'Room',
            tableName: 'rooms',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }

    static associate(db) {
        db.Room.hasMany(db.RoomMem, { foreignKey : 'roomId', sourceKey : 'id'})
        db.Room.hasMany(db.Chat, { foreignKey : 'roomId', sourceKey : 'id'})
    }
}