const Sequelize = require('sequelize')

module.exports = class PostImg extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            imgPath : {
                type : Sequelize.STRING(200),
                allowNull : false
            },
            imgName : {
                type : Sequelize.STRING(200),
                allowNull : false
            },
            createdAt : {
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW
            }
        }, {
            sequelize,
            timestamps : false,  // createAt, updateAt 자동생성
            underscored : false, // 기본 카멜표기법 true면 스네이크표기법 false면 카멜표기법
            paranoid : false, // deleteAt 자동생성(soft delete)
            modelName : 'PostImg',
            tableName : 'postImgs',
            charset : 'utf8',
            collate: 'utf8_general_ci'
        })
    };

    static associate(db) {
        db.PostImg.belongsTo(db.Post, { foreignKey : 'postId', targetKey: 'id'})
    }
}