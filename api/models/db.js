const Sequelize = require('sequelize');

const sequelize = new Sequelize('app_react','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

// verificar a coneccao com banco de dados
// sequelize.authenticate()
// .then(function() {
//     console.log("conexão sucesso");
// }).catch(function(err){
//     console.log("erro na conexão");
// })

module.exports = sequelize;