/*
 * @Autor: Ian Rotondo Bagliotti 
 * @Data: 2019-02-07 12:00:30 
 * @Última modificação por: Ian Rotondo Bagliotti 
 * @Última hora modificada: 2019-02-07 12:00:30 
*/

const mongoose = require('mongoose')
// configura diretorio pasta config que possui a URI do mongoDB
process.env["NODE_CONFIG_DIR"] = __dirname + "./../config"
const config = require('config')

mongoose.connect(config.DBHost,
    { useMongoClient: true },
    (error) => error ? console.log('Falha na conexão com o MongoDB!', error) : null)

mongoose.connection.once('open', () => console.log('MongoDB Conectado!'))
