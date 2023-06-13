const SHA256 = require('crypto-js/sha256');
const Transacao = require('./transacao');
const Blockchain = require('./blockchain');

let teste = new Blockchain();

teste.criandoTransacao(new Transacao('addres1', 'addres2', 100));
teste.criandoTransacao(new Transacao('addres2', 'addres1', 200));
console.log("\n iniciando a mineração... ");
teste.minerandoTransacoesPendentes();
/*
console.log('Minerando bloco 1...')
teste.addBlock(new Block(1, "14/04/2023", {anount: 4}));
console.log('Minerando bloco 2...')
teste.addBlock(new Block(2, "15/04/2023", {anount: 10}));
*/
