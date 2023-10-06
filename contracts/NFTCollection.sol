// SPDX-License-Identifier: MIT
pragma solidity =0.8.19;

import { ERC721, ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { INFTCollection } from "./INFTCollection.sol";

contract NFTCollection is INFTCollection, ERC721URIStorage {
  address public owner;

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this funciton!");
    _;
  }

  constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
    owner = msg.sender;
  }

  function mint(address to_, uint256 tokenId_, string memory tokenURI_) external onlyOwner {
    _mint(to_, tokenId_);
    _setTokenURI(tokenId_, tokenURI_);
  }

  function setTokenURI(uint256 tokenId_, string memory tokenURI_) external {
    require(ownerOf(tokenId_) == msg.sender, "Only owner of token can set or change URI");
    _setTokenURI(tokenId_, tokenURI_);
  }
}
