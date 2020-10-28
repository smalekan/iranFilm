module.exports = function(sequelize, Sequelize) {

    var Movie = sequelize.define('Movie', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING,
        },
        original_title: {
            type: Sequelize.STRING
        },
        rate: {
            type: Sequelize.INTEGER
        },
        poster_url : {
          type : Sequelize.STRING
        },

        cover_url : {
          type : Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        },
        length: {
            type: Sequelize.STRING
        },
        language: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        director: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        }

    });
    Movie.associate = function(models) {
        models.Movie.hasMany(models.Comment);
    };
    return Movie;

}
