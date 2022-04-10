const Sequelize = require('sequelize');

module.exports = class Inquiry extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title : {
                type : Sequelize.STRING(300),
                allowNull : false
            },
            content : {
                type : Sequelize.STRING(300),
                allowNull : false
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
            modelName: 'Inquiry',
            tableName: 'inquirys',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    };

    static associate(db) {
        db.Inquiry.belongsTo(db.Member, { foreignKey : 'memberId', targetKey : 'id'})
    }
}