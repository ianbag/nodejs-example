/**
 * File: test/carro-test.js
 * Author: Hygor Podgornik
 * Description: Arquivo responsável por realizar os testes com Chai e Mocha
 * Date: 24/01/2019
 */

process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Carro = require('../app/models/carro');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

//BLOCO PRINCIPAL DE TESTES
describe('CARROS', function () {
    beforeEach(function (done) {
        Carro.remove({}, function (error) {
            done();
        });
    });

    //TESTE ROTA: GET
    describe('/GET carro', function () {
        it('Deve retornar todos os carros cadastrados na base de dados', function (done) {

            chai.request(server)
                .get('/carro')
                .end(function (req, res) {
                    //SE TUDO OK RETORNA STATUS 200
                    res.should.have.status(200);
                    //RETORNA ARRAY COM OS CARROS REGISTRADOS
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    //TESTE ROTA: POST
    describe('/POST carro', function () {
        it('Não deve retornar o POST do carro adicionado, visto que não foi definido o campo ANO do veículo', function (done) {

            //SIMULAÇÃO DE CRIAÇÃO DE UM CARRO
            var carro = {
                marca: "Volkswagen",
                modelo: "Passat",
                motor: "2.0 TSI"
            }

            chai.request(server)
                .post('/carro')
                .send(carro)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('ano');
                    res.body.errors.ano.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('Deve adicionar um carro', function (done) {

            //SIMULAÇÃO DE CRIAÇÃO DE UM CARRO
            var carro = {
                marca: "Volkswagen",
                modelo: "Passat",
                ano: 2018,
                motor: "2.0 TSI"
            }

            chai.request(server)
                .post('/carro')
                .send(carro)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('message').eql('Carro adicionado com sucesso');
                    res.body.carro.should.have.property('marca');
                    res.body.carro.should.have.property('modelo');
                    res.body.carro.should.have.property('ano');
                    res.body.carro.should.have.property('motor');
                    done();
                });
        });
    });

    //TESTE ROTA: GET/:id
    describe('/GET/:id carro', function () {
        it('Deve retornar um carro dado o id dele', function (done) {

            var carro = new Carro({
                marca: "Ford",
                modelo: "Mustang",
                ano: 1969,
                motor: "3.0 V8"
            });

            carro.save(function (error, carro) {
                chai.request(server)
                    .get('/carro/' + carro.id)
                    .send(carro)
                    .end(function (error, res) {
                        res.should.be.a('object');
                        res.body.should.have.property('marca');
                        res.body.should.have.property('modelo');
                        res.body.should.have.property('ano');
                        res.body.should.have.property('motor');
                        res.body.should.have.property('_id').eql(carro.id);
                        done();
                    });
            });
        });
    });

    //TESTE ROTA: PUT/:id
    describe('/PUT/:id carro', function () {
        it('Deve atualizar um carro dado o id dele', function (done) {

            var carro = new Carro({
                marca: "BMW",
                modelo: "328i",
                ano: 2016,
                motor: "2.0 Twin Power Turbo"
            });

            carro.save(function (error, carro) {
                chai.request(server)
                    .put('/carro/' + carro.id)
                    .send({
                        marca: "BMW",
                        modelo: "328i",
                        ano: 2016,
                        motor: "2.0 Twin Power Turbo"
                    })
                    .end(function (error, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Carro atualizado com sucesso');
                        res.body.carro.should.have.property('ano').eql(2016);
                        done();
                    });
            });
        });
    });

    //TESTE ROTA: DELETE/:id
    describe('/DELETE/:id carro', function () {
        it('Deve excluir um carro dado o id dele', function (done) {

            var carro = new Carro({
                marca: "BMW",
                modelo: "328i",
                ano: 2012,
                motor: "2.0 Twin Power Turbo"
            });

            carro.save(function (error, carro) {
                chai.request(server)
                    .delete('/carro/' + carro.id)
                    .end(function (error, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Carro excluido com sucesso');
                        done();
                    });
            });
        });
    });
});