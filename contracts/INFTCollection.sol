// SPDX-License-Identifier: MIT
pragma solidity =0.8.19;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface INFTCollection is IERC721 {
  function mint(address to_, uint256 tokenId_, string memory tokenURI_) external;
}
