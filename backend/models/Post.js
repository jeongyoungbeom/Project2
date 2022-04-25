const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title : {
                type : Sequelize.STRING(200),
                allowNull : false
            },
            content : {
                type : Sequelize.STRING(500),
                allowNull : false
            },
            hit : {
                type : Sequelize.INTEGER.UNSIGNED,
                defaultValue : 0
            },
            report : {
                type : Sequelize.ENUM('Y', 'N'),
                allowNull : false,
                defaultValue : 'N'
            }
        }, {
            sequelize,
            timestamps : true,  // createAt, updateAt 자동생성
            underscored : false, // 기본 카멜표기법 true면 스네이크표기법 false면 카멜표기법
            paranoid : false, // deleteAt 자동생성(soft delete)
            modelName : 'Post',
            tableName : 'Posts',
            charset : 'utf8',
            collate: 'utf8_general_ci'
        })
    };

    static associate(db) {
        db.Post.hasMany(db.PostImg, { foreignKey : 'postId', sourceKey : 'id'})
        db.Post.hasMany(db.Reply, { foreignKey : 'postId', sourceKey : 'id'})
        db.Post.belongsToMany(db.Member, { through : 'PostLike', foreignKey : 'postId'})
        db.Post.belongsTo(db.Member, { foreignKey : 'memberId', targetKey: 'id'});
        db.Post.belongsToMany(db.HashTag, { through : 'PostHashTag', foreignKey : 'postId'});
    }
};