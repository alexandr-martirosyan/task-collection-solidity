import { deployNewContract } from "../helpers/deployments/deployment";
import { UpgradeType } from "../helpers/deployments/upgradeType";
import { NFTCollectionFactory } from "../typechain-types";

const main = async () => {
  const nftCollectionFactory = await deployNewContract<NFTCollectionFactory>(
    "NFTCollectionFactory",
    UpgradeType.NON_UPGRADEABLE
  );
  console.log("contract address ->", nftCollectionFactory.address);
};

main();
