/**
 * File: app/models/voo.js
 * Author: Hygor Podgornik
 * Description: Arquivo responsável pelo modelo de dados do vôo
 * Date: 25/01/2019
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Definindo o Schema do carro
var VooSchema = new Schema(
    {
        partida: { type: String, required: true },
        destino: { type: String, required: true },
        numeroVoo: { type: Number, required: true },
        companhia: { type: String, required: true },
        adicionadoEm: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

//Setando o parâmetro "adicionadoEm"
VooSchema.pre('save', next => {
    var dataAtual = new Date();
    if (!this.adicionadoEm) {
        this.adicionadoEm = dataAtual;
    }
    next();;
});

module.exports = mongoose.model('voo', VooSchema);