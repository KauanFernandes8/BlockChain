const SHA256 = require('crypto-js/sha256');
class Block
{
    constructor(index, timestamp, data, previusHash = '')//daddos do bloco:
    {
        /*Dados/carimbo de data, hash do bloco anterior*/
        //indice = onde o bloco fica na cadeia de blocos
        //timestamp = quando o bloco foi criado 
        //data = qq tipo de dados que queremos associar à blockchian
        //previdusHash = string que guarda o hash do bloco anterior; garantindo assim a integridade da nossa cadeia
        //hash = guarda o endereço do nosso bloco
        this.index = index;
        this.timestamp = timestamp
        this.data = data;
        this.previusHash = previusHash;
        this.hash = this.calculaHash();
    }
    calculaHash()
    {
        /*Método que calcula o hash do bloco atual
        vai pegar as blocos deste bloco em que estamos, executa-las através da 
        função do hash e, em seguida retorna o nosso hash. 
        Isso identificará nosso bloco na corrente*/
        return SHA256(this.index + this.previusHash + JSON.stringify(this.data).toString)//deve retorna o hash baseado na adição dos nossos parametros
    }
}

class Blockchain
{
    //construtor é o responsavel de inicar nossa blockchain
    constructor()
    {
        /*iniciando uma cadeia de propriedades
        para que seja uma matriz das informações*/
        this.chain = [this.createGenesisBlock()]
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

    addBlock(newBlock)
    {
        //definindo o hash do bloco anterior 
        newBlock.previusHash = this.getLastBlock().hash;//pegando o bloco mais recente
        newBlock.hash = newBlock.calculaHash();//recalcula o hash do bloco anterior
        this.chain.push(newBlock);//empurrando para a cadeia de dados
    }
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

let teste = new Blockchain();
teste.addBlock(new Block(1, "14/04/2023", {anount: 4}));
teste.addBlock(new Block(2, "15/04/2023", {anount: 10}));

//console.log('Essa cadeia de blocos é válida? ' + teste.isValid());
//console.log(JSON.stringify(teste, null, 4)); 

teste.chain[1].data = {anount: 100};
teste.chain[1].hash = teste.chain[1].calculaHash();//mesmo recalculando o hash, não funciona
console.log('Essa cadeia de blocos é válida? ' + teste.isValid());