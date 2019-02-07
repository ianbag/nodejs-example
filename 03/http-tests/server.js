/**
 * File: server.js
 * Author: Hygor Podgornik
 * Description: Arquivo responsável por executar a aplicação
 * Date: 25/01/2019 
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var voo = require('./app/routes/voo');
var config = require('config');
var port = 3000;

//Opções da base de dados
var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

//Realizando conexão com a base de dados
mongoose.connect(config.DBHost, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao estabelecer conexão com a base de dados'));

//Exibir logs dos testes
if (config.util.getEnv('NODE_ENV ') !== 'test') {

    //Utilização do Morgan para realizar requisições de logger no middleware
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => res.json({ message: "Base de dados de Vôos" }));

//Definindo rotas GET e POST
app.route('/voo')
    .get(voo.selecionarTodosOsVoos)
    .post(voo.adicionarVoo);

//Definindo rotas GET, PUT, DELETE
app.route('/voo/:id')
    .get(voo.selecionarVooPorId)
    .put(voo.editarVoo)
    .delete(voo.excluirVoo)

app.listen(port);
console.log(`Aplicação executando na porta ${port}`);

module.exports = app;