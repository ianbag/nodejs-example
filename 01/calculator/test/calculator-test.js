/*
 * @Autor: Ian Rotondo Bagliotti 
 * @Data: 2019-02-07 12:04:02 
 * @Última modificação por: Ian Rotondo Bagliotti 
 * @Última hora modificada: 2019-02-07 12:04:02 
*/
const { assert } = require('chai');
const calculator = require('../app/calculator')


describe('TDD de Operações da Calculadora', function (){
    it('Deve somar 2 números', () => {
        assert.equal(calculator.somar(1,5), 6)
    })
    it('Deve subtrair 2 números', () => {
        assert.equal(calculator.subtrair(5,1), 4)
    })
    it('Deve multiplicar 2 números', () => {
        assert.equal(calculator.multiplicar(5,2), 10)
    })
    it('Deve dividir dois números', () => {
        assert.equal(calculator.dividir(6,2), 3)
    })

})