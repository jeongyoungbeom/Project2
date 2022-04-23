const Sequelize = require('sequelize')

module.exports = class PostImg extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            parentId : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
                defaultValue : 0
            },
            groupId : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
            },
            groupNum : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
            },
            depth : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
            },
            content : {
                type : Sequelize.STRING(200),
                allowNull : false
            }
        }, {
            sequelize,
            timestamps : true,  // createAt, updateAt 자동생성
            underscored : false, // 기본 카멜표기법 true면 스네이크표기법 false면 카멜표기법
            paranoid : false, // deleteAt 자동생성(soft delete)
            modelName : 'Reply',
            tableName : 'Replys',
            charset : 'utf8',
            collate: 'utf8_general_ci'
        })
    };

    static associate(db) {
        db.Reply.belongsToMany(db.Member, { through : 'ReplyLike', foreignKey : 'replyId'})
        db.Reply.belongsTo(db.Member, { foreignKey : 'memberId', targetKey : 'id'}),
        db.Reply.belongsTo(db.Post, { foreignKey : 'postId', targetKey : 'id'})
    }
}