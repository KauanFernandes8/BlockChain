class Transacao
{
    constructor(fromAddress, toAddress, value)
    {
        this.fromAddress = fromAddress;     // vem de quem?
        this.toAddress = toAddress;         // vai pra quem?
        this.value = value;                 // o que vai?(valor)
    }
    //transações pendentes 
}
module.exports = Transacao;