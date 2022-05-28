const Sequelize = require('sequelize');
const db = require('./db');

const Anuncio = db.define('anuncios',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

//cria a tabela se ela não existir
Anuncio.sync();

module.exports = Anuncio;