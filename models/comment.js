module.exports = function(sequelize, Sequelize) {

    var Comment = sequelize.define('Comment', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        author: {
            type: Sequelize.STRING
        },

        comment: {
            type: Sequelize.TEXT
        },
        rate: {
            type: Sequelize.INTEGER
        }


    });
    Comment.associate = function (models) {
        models.Comment.belongsTo(models.Movie, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
              }
        });
    };

    return Comment;

}
