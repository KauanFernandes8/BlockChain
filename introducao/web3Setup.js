const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545'); // Substitua pela URL do seu endpoint Ganache
const contractAddress = 'ENDEREÇO_DO_CONTRATO'; // Substitua pelo endereço do seu contrato

const contract = new web3.eth.Contract(ABI, contractAddress);


const pdfData = 'dados_do_seu_documento_em_bytes';
const name = 'NomeDoDocumento.pdf';
const account = 'SEU_ENDERECO_ETHEREUM'; // O endereço de sua conta Ethereum

contract.methods.addDocument(pdfData, name).send({ from: account })
    .on('transactionHash', (hash) => {
        console.log(`Transação enviada com hash: ${hash}`);
    })
    .on('receipt', (receipt) => {
        console.log(`Documento adicionado com sucesso na posição: ${receipt.events.DocumentAdded.returnValues.documentId}`);
    })
    .catch(error => {
        console.error(`Erro ao adicionar documento: ${error.message}`);
    });