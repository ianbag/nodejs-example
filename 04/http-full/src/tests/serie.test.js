/*
 * @Autor: Ian Rotondo Bagliotti 
 * @Data: 2019-02-07 12:00:57 
 * @Última modificação por: Ian Rotondo Bagliotti 
 * @Última hora modificada: 2019-02-07 12:00:57 
*/
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const SerieModel = require('./../app/models/serie')
const server = require('./../../server')

MOCK_SERIE_DEFAULT = {
    nome: 'Super Girl',
    autor: 'Warner Bros',
    genero: 'Super-Heroi, Ação, Aventura, Drama, Ficção Científica',
    numeroTemporada: 4
}

MOCK_SERIE_CADASTRAR = {
    nome: 'Arrow',
    autor: 'The CW Television Network',
    genero: 'Super-herói, Drama, Ação, Crime, Mistério',
    numeroTemporada: 7
}

MOCK_SERIE_ATUALIZAR = {
    nome: 'Vikings',
    autor: 'History',
    genero: 'Drama histórico, Ação-aventura'
    // se não passar algum campo ao atualizar, ele mantém o antigo
}

let MOCK_DEFAULT_ID

describe('TDD Serie', function (){
    this.beforeAll(async () => {
        await SerieModel.remove({})
        const result = await SerieModel.create(MOCK_SERIE_DEFAULT)
        MOCK_DEFAULT_ID = result._id
    })

    describe('/GET:', () => {
        it('Deve listar as series cadastradas', (done) => {
            chai.request(server).get('/serie')
            .end((error, res) => {
                expect(res.statusCode).to.eql(200)
                const [{nome, autor, genero, numeroTemporada}] = res.body.data
                expect({nome, autor, genero, numeroTemporada}).to.eql(MOCK_SERIE_DEFAULT)
                done()
            })
        })
    })

    describe('/GET/ID:', () => {
        it('Deve listar apenas uma série pelo ID', (done) =>{
            chai.request(server).get(`/serie/${MOCK_DEFAULT_ID}`)
            .end((error, res) => {
                expect(res.statusCode).to.eql(200)
                const {nome, autor, genero, numeroTemporada} = res.body.data
                expect({nome, autor, genero, numeroTemporada}).to.eql(MOCK_SERIE_DEFAULT)
                done()
            })
        })

    describe('/POST:' , () => {
        it('Deve cadastrar uma série', (done) => {
            chai.request(server).post('/serie')
            .send(MOCK_SERIE_CADASTRAR)
            .end((error, res) => {
                expect(res.statusCode).to.eql(200)
                const {nome, autor, genero, numeroTemporada} = res.body.data
                expect({nome, autor, genero, numeroTemporada}).to.eql(MOCK_SERIE_CADASTRAR)
                done()
            })
        })
        it('Deve retornar erro ao cadastrar uma série, por falta de preencher o campo nome', (done) => {
            delete MOCK_SERIE_CADASTRAR.nome
            chai.request(server).post('/serie')
            .send(MOCK_SERIE_CADASTRAR)
            .end((error, res) => {
                expect(res.statusCode).to.eql(200)
                expect(res.body.errors.nome.kind).to.eql('required')
                done()
            })
        })
    })
    describe('/PUT:', () => {
        it('Deve atualizar uma série pelo ID', (done) => {
            chai.request(server).put(`/serie/${MOCK_DEFAULT_ID}`)
            .send(MOCK_SERIE_ATUALIZAR)
            .end((error, res) => {
                expect(res.statusCode).to.eql(200)
                expect(res.body.data.nModified).to.eql(1)
                done()
            })
        })
    })
    describe('/DELETE:', () => {
        it('Deve deletar uma série pelo ID', (done)=> {
            chai.request(server).delete(`/serie/${MOCK_DEFAULT_ID}`)
            .end((error, res) => {
                expect(res.statusCode).to.eql(200)
                const {nome, autor, genero} = res.body.data
                expect({nome, autor, genero}).to.eql(MOCK_SERIE_ATUALIZAR)
                done()
            })
        })
    })

    })
})