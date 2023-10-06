// SPDX-License-Identifier: MIT
pragma solidity =0.8.19;

interface INFTCollectionFactory {
  event TokenMinted(
    address indexed collection,
    address indexed recipient,
    uint256 indexed tokenId,
    string tokenURI
  );
  event CollectionCreated(address indexed collection, string name, string symbol);

  function createCollection(
    string memory name_,
    string memory symbol_,
    address collectionOwner_
  ) external;

  function mintToken(
    address collection_,
    address to_,
    uint256 tokenId_,
    string memory tokenURI_
  ) external;
}
