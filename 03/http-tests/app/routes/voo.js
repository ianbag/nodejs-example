/**
 * File: app/routes/voo.js
 * Author: Hygor Podgornik
 * Description: Arquivo responsável pelas rotas da api
 * Date: 25/01/2019
 */

var mongoose = require('mongoose');
var Voo = require('../models/voo');

//1º MÉTODO - SELECIONAR TODOS OS VÔOS
function selecionarTodosOsVoos(req, res) {

    var query = Voo.find({});
    query.exec(function (error, voos) {
        if (error) {
            res.send(error);
        }
        res.json(voos);
    });
}

//2º MÉTODO - ADICIONAR VÔO
function adicionarVoo(req, res) {

    var novoVoo = new Voo(req.body);

    novoVoo.save(function (error, voo) {
        if (error) {
            res.send(error);
        } else {
            res.json({
                message: "Vôo adicionado com sucesso", voo
            });
        }
    });
}

//3º MÉTODO - SELECIONAR VÔO POR ID
function selecionarVooPorId(req, res) {

    Voo.findById(req.params.id, function (error, voo) {
        if (error) {
            res.send(error);
        }
        res.json(voo);
    });
}

//4º MÉTODO - EXCLUIR VÔO
function excluirVoo(req, res) {

    Voo.remove({ _id: req.params.id }, function (error, resultado) {
        res.json({ message: "Vôo excluido com sucesso", resultado });
    });
}

//5º MÉTODO - EDITAR VÔO
function editarVoo(req, res) {

    Voo.findById({ _id: req.params.id }, function (error, voo) {
        if (error) {
            res.send(error);
        }

        Object.assign(voo, req.body).save(function (error, voo) {
            if (error) {
                res.send(error);
            }
            res.json({ message: "Vôo editado com sucesso", voo });
        });
    });
}

module.exports = { selecionarTodosOsVoos, selecionarVooPorId, adicionarVoo, editarVoo, excluirVoo };