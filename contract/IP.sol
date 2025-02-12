// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;    

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LanguageIP is ERC721URIStorage, Ownable {
    struct Content {
        uint256 id;
        address creator;
        string originalLanguage;
        mapping(string => bool) translations; // language => exists
        uint256 price;
        bool isLicensed;
    }

    uint256 private _tokenIds;
    mapping(uint256 => Content) public contents;
    mapping(address => uint256[]) public creatorContents;

    event ContentRegistered(uint256 id, address creator, string language);
    event TranslationAdded(uint256 id, string language, address translator);
    event ContentLicensed(uint256 id, address licensee, uint256 price);

    constructor() ERC721("LanguageAI IP", "LAIP") {}

    function registerContent(
        string memory metadataURI, 
        string memory language,
        uint256 price
    ) external returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadataURI);

        Content storage newContent = contents[newItemId];
        newContent.id = newItemId;
        newContent.creator = msg.sender;
        newContent.originalLanguage = language;
        newContent.price = price;

        creatorContents[msg.sender].push(newItemId);

        emit ContentRegistered(newItemId, msg.sender, language);
        return newItemId;
    }

    function addTranslation(
        uint256 contentId,
        string memory language,
        string memory translationURI
    ) external {
        require(_exists(contentId), "Content does not exist");
        Content storage content = contents[contentId];
        require(!content.translations[language], "Translation already exists");

        content.translations[language] = true;
        // Store translation metadata
        _setTokenURI(contentId, translationURI);

        emit TranslationAdded(contentId, language, msg.sender);
    }

    function licenseContent(uint256 contentId) external payable {
        require(_exists(contentId), "Content does not exist");
        Content storage content = contents[contentId];
        require(msg.value >= content.price, "Insufficient payment");

        content.isLicensed = true;
        payable(content.creator).transfer(msg.value);

        emit ContentLicensed(contentId, msg.sender, msg.value);
    }

    function getCreatorContents(address creator) external view returns (uint256[] memory) {
        return creatorContents[creator];
    }
} 