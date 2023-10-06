# NFTCollectionFactory

Contract is deployed on Sepolia testnet. address: 0xBD0D4206bb1F229dA79b493C2eb7C9DF9E1B4708

## How to deploy

To deploy your own version of contract on any chain follow the steps

1. run `yarn` in terminal to install dependencies
2. copy .env.example to .env
3. set `{NETWORK}_RPC`
4. set `{NETWORK}_API_KEY` if you want verify the contract
5. set `DEPLOYER_PK`
6. `yarn clean`
7. `yarn compile`
8. to deploy contract without verification run `yarn runScript scripts/deploy.ts --network YOUR_NETWORK`
9. to deploy WITH contract verification run `yarn runAndVerify scripts/deploy.ts --network YOUR_NETWORK`
