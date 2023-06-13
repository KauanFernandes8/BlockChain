const SHA256 = require('crypto-js/sha256');
class Block
{
    constructor(timestamp, data, previusHash = '')//daddos do bloco:
    {
        /*Dados/carimbo de data, hash do bloco anterior*/
        //indice = onde o bloco fica na cadeia de blocos
        //timestamp = quando o bloco foi criado 
        //data = qq tipo de dados que queremos associar à blockchian
        //previdusHash = string que guarda o hash do bloco anterior; garantindo assim a integridade da nossa cadeia
        //hash = guarda o endereço do nosso bloco
        this.timestamp = timestamp
        this.data = data;
        this.previusHash = previusHash;
        this.hash = this.calculaHash();
        this.nonce = 0;
    }
    calculaHash()
    {
        /*Método que calcula o hash do bloco atual
        vai pegar as blocos deste bloco em que estamos, executa-las através da 
        função do hash e, em seguida retorna o nosso hash. 
        Isso identificará nosso bloco na corrente*/
        return SHA256(this.index + this.previusHash + JSON.stringify(this.data)+this.nonce).toString();//deve retorna o hash baseado na adição dos nossos parametros
    }
    mineBlock(dificuldade)//determina a dificuldade do hash do nosso bloco
    {
        while(this.hash.substring(0, dificuldade)!== Array(dificuldade + 1).join("0"))//nosso hash começará com uma quantidade de 00
        {
            this.nonce++;
            this.hash = this.calculaHash();//calculando o hash do bloco
        }
        console.log("Bloco mineirado: " + this.hash);
    }
}
module.exports = Block;