pragma solidity ^0.8.0;

contract DocumentRegistry{
    struct Document{
        bytes pdfData;
        string name;
        address owner; 
        uint timestamp;
    }

    Document[] public documents;

    event DocumentAdded(uint indexed documentId, string name, address owner);

    function addDocument(bytes memory pdfData, string memory name) public {
        Document memory newDocument;
        newDocument.pdfData = pdfData;
        newDocument.name = name;
        newDocument.owner = msg.sender;
        newDocument.timestamp = block.timestamp;

        documents.push(newDocument);
        emit DocumentAdded(documents.length -1, name, msg.sender);
    }

    function getDocument(uint documentId) public view returns(bytes memory pdfData, string memory name, address owner, uint timestamp){
        require(documentId<documents.length, "Document does not exist");
        Document storage doc = documents[documentId];
        return (doc.pdfData, doc.name, doc.owner, doc.timestamp);
    }   
}