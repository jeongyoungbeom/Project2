const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content : {
                type : Sequelize.STRING(200),
                allowNull : false
            },
            type : {
                type : Sequelize.STRING(100),
                allowNull : false,
                defaultValue : 'TEXT'
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
            modelName: 'Chat',
            tableName: 'chats',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }

    static associate(db) {
        db.Chat.belongsTo(db.Member, { foreignKey : 'memberId', targetKey : 'id'})
        db.Chat.belongsTo(db.Room, { foreignKey : 'roomId', targetKey : 'id'})
    }
}