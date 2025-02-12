// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IPRegistry {
    mapping(address => string) public ipRecords;

    event IPRegistered(address indexed owner, string ipName);
    event IPTransferred(address indexed oldOwner, address indexed newOwner, string ipName);

    function registerIP(string memory ipName) external {
        require(bytes(ipRecords[msg.sender]).length == 0, "IP already registered");
        ipRecords[msg.sender] = ipName;
        emit IPRegistered(msg.sender, ipName);
    }

    function transferIP(address newOwner) external {
        require(bytes(ipRecords[msg.sender]).length > 0, "No IP registered");
        require(bytes(ipRecords[newOwner]).length == 0, "Recipient already owns an IP");

        ipRecords[newOwner] = ipRecords[msg.sender];
        delete ipRecords[msg.sender];

        emit IPTransferred(msg.sender, newOwner, ipRecords[newOwner]);
    }

    function getIP(address owner) external view returns (string memory) {
        return ipRecords[owner];
    }
}
