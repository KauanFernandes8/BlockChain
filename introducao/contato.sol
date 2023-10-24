pragma solidity ^0.8.0;

contract DocumentRegistry {
    // Mapeamento que associa endereços de usuários a referências de documentos (hashes)
    mapping(address => string) public referenciaDocumento;

    // Função para adicionar uma referência a um documento
    function addReferenciaDocumento(string memory documentoHash) public {
        referenciaDocumento[msg.sender] = documentoHash;
    }

    // Função para recuperar a referência a um documento
    function getDocumentReference() public view returns (string memory) {
        return referenciaDocumento[msg.sender];
    }
}
