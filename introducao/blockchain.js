const Block = require('./Block');
const Transacao = require('./transacao');
class Blockchain
{
    //construtor é o responsavel de inicar nossa blockchain
    constructor()
    {
        /* iniciando uma cadeia de propriedades
        para que seja uma matriz das informações
        */
        this.chain = [this.createGenesisBlock()]
        this.dificuldade = 2; //todos os blocos começarão com 2 zeros
        this.transacaoPendente = [];
    }
    //criando o primeiro bloco da cadeia
    createGenesisBlock()
    {
        return new Block(0, "13/04/2023", "Criando o Bloco Genesis", 0);
    }

    //métodos que podem ser uteis
    getLastBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    minerandoTransacoesPendentes()
    {
        let bloco = new Block(Date.now(), this.transacaoPendente); //um novo bloco será gerado guardando assim todas informações pendentes
        bloco.mineBlock(this.dificuldade);

        console.log("Bloco minerado com sucesso")
        this.chain.push(bloco)

        this.transacaoPendente = [
            new Transacao(null)
        ];
    }
    criandoTransacao(transacao)
    {
        this.transacaoPendente.push(transacao)
    }
    /*addBlock(newBlock)
    {
        //12/05/2023 - Alterando o método
        //definindo o hash do bloco anterior 
        newBlock.previusHash = this.getLastBlock().hash;//pegando o bloco mais recente
        newBlock.mineBlock(this.dificuldade);
        this.chain.push(newBlock);//empurrando para a cadeia de dados
    }*/
    isValid()
    {
        //verificando se os blocos estão vinculados
        for(let i = 1; i<this.chain.length; i++)//não começamos com 0, pq 0 é o genesis
        {
            const blocoAtual = this.chain[i];
            const blocoAnterior = this.chain[i-1];

            /*verificando se o hash do bloco ainda é valido
            */
            if(blocoAtual.hash !== blocoAtual.calculaHash())//hash do bloco atual é diferente do que foi calculado
                return false;
            
            if(blocoAtual.previusHash !== blocoAnterior.hash())//se o bloco atual possui hash anterior, e se não for
                return false;
        }
        return true
    }
}
module.exports = Blockchain;