// SPDX-License-Identifier: MIT
pragma solidity =0.8.19;

import { EnumerableSet } from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import { INFTCollection, NFTCollection } from "./NFTCollection.sol";
import { INFTCollectionFactory } from "./INFTCollectionFactory.sol";

contract NFTCollectionFactory is INFTCollectionFactory {
  // Add the library methods
  using EnumerableSet for EnumerableSet.AddressSet;

  modifier onlyCollectionOwner(address collectionAddress) {
    require(
      _userCollections[collectionAddress].contains(msg.sender),
      "Collection does not belong to user!"
    );
    _;
  }

  mapping(address => EnumerableSet.AddressSet) private _userCollections;

  function createCollection(
    string memory name_,
    string memory symbol_,
    address collectionOwner_
  ) external {
    address collection = address(new NFTCollection(name_, symbol_));
    _userCollections[collectionOwner_].add(collection);
    emit CollectionCreated(collection, name_, symbol_);
  }

  function mintToken(
    address collection_,
    address to_,
    uint256 tokenId_,
    string memory tokenURI_
  ) external {
    INFTCollection(collection_).mint(to_, tokenId_, tokenURI_);
    emit TokenMinted(collection_, to_, tokenId_, tokenURI_);
  }
}
