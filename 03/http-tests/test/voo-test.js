/*
 * @Autor: Ian Rotondo Bagliotti 
 * @Data: 2019-02-07 12:03:12 
 * @Última modificação por: Ian Rotondo Bagliotti 
 * @Última hora modificada: 2019-02-07 12:03:12 
*/

process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const server = require('./../server')
const Voo = require('./../app/models/voo')
chai.use(chaiHttp)

const MOCK_VOO_DEFAULT = {
    partida: 'Ribeirão Preto',
    destino: 'Natal',
    numeroVoo: 54321,
    companhia: 'Gol'
}

const MOCK_VOO_CADASTRAR = {
    partida: 'São Paulo',
    destino: 'Rio de Janeiro',
    numeroVoo: 12345,
    companhia: 'Avianca'
}

const MOCK_VOO_ATUALIZAR = {
    partida: 'São Paulo',
    destino: 'Fortaleza',
    numeroVoo: 12345,
    companhia: 'Avianca'
}

let MOCK_DEFAULT_ID = ''

describe('TDD VOO', function () {
    this.beforeAll(async () => {
        await Voo.remove({})
        const result = await Voo.create(MOCK_VOO_DEFAULT)
        MOCK_DEFAULT_ID = result._id
    })

    describe('/GET:', () => {
        it('Deve retornar os vôos', (done) => {
            chai.request(server).get('/voo')
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200);
                    const [{ partida, destino, numeroVoo, companhia }] = res.body
                    expect({ partida, destino, numeroVoo, companhia }).to.eql(MOCK_VOO_DEFAULT)
                    done()
                })
        })
    })

    describe('/GET/ID:', () => {
        it('Deve retornar apenas um vôo pelo ID', (done) => {
            chai.request(server).get(`/voo/${MOCK_DEFAULT_ID}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    const { partida, destino, numeroVoo, companhia } = res.body
                    expect({partida, destino, numeroVoo, companhia}).to.eql(MOCK_VOO_DEFAULT)
                    done()
                })
        })
    })

    describe('/POST:', () => {
        it('Deve adicionar um vôo', (done) => {
            chai.request(server).post('/voo')
                .send(MOCK_VOO_CADASTRAR)
                .end((error, res) => {
                    // espear que o response retorne o status 200
                    expect(res.statusCode).to.eql(200)
                    // espera que no corpo tenha a mensagem correspondente
                    expect(res.body.message).to.eql('Vôo adicionado com sucesso')
                    // recupera os dados da request
                    const { partida, destino, numeroVoo, companhia } = res.body.voo
                    // espera que os dados da request seja igual com os dados do response
                    expect({ partida, destino, numeroVoo, companhia }).to.eql(MOCK_VOO_CADASTRAR)
                    done()
                })
        })
        it('Não deve adicionar um vôo, por falta de destino no request', (done) => {
            delete MOCK_VOO_CADASTRAR.destino
            chai.request(server).post('/voo')
                .send(MOCK_VOO_CADASTRAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    // espera que o response traga o erro do campo destino ser obrigatório
                    expect(res.body.errors.destino.kind).to.eql('required')
                    done()
                })
        })
    })

    describe('/PUT:', () => {
        it('Deve atualizar um vôo pelo ID', (done) => {
            chai.request(server).put(`/voo/${MOCK_DEFAULT_ID}`)
                .send(MOCK_VOO_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    const { partida, destino, numeroVoo, companhia } = res.body.voo
                    expect({ partida, destino, numeroVoo, companhia }).to.eql(MOCK_VOO_ATUALIZAR)
                    done()
                })
        })
    })

    describe('/DELETE: ', () =>{
        it('Deve deletar um vôo pelo ID', (done) => {
            chai.request(server).delete(`/voo/${MOCK_DEFAULT_ID}`)
            .end((error, res) => {
                expect(res.statusCode).to.eql(200)
                // espera que o response retorne o número de itens deletados e que seja 1
                expect(res.body.resultado.n).to.eql(1)
                done()
            })
        })
    })
})