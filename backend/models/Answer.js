const Sequelize = require('sequelize');

module.exports = class Answer extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            adminId : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false
            },
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
            modelName: 'Answer',
            tableName: 'answers',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
}