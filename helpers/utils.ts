import fs from "fs";
import { BigNumber } from "ethers";
import hre, { ethers, network } from "hardhat";

import configs from "../configs/configs.json";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const verifyContract = async (contractAddress: string, constructorArguments: Array<any>) => {
  await sleep(16000);
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments,
    });
  } catch (error) {
    console.error("error is ->");
    console.error(error);
    console.error("cannot verify contract", contractAddress);
  }
};

export const impersonateAccount = async (address: string) => {
  return hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
};

export const _saveAddresses = (
  addresses: Record<string, string | object>,
  useAutoSavePath: boolean,
  append: boolean
) => {
  const specialFolder = process.env.SPECIAL_FOLDER;
  const specialName = process.env.SPECIAL_NAME;
  let dir = `./${configs.addressesLocation}/${network.name}/`;
  if (useAutoSavePath) {
    dir = `./${configs.addressesLocation}/autosave/${network.name}/`;
  }
  let jsonPath = dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (specialFolder) {
    const folderPath = `${dir}${specialFolder}/`;
    jsonPath = folderPath;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }
  if (specialName) {
    jsonPath += `${specialName}`;
  }
  jsonPath += "Addresses.json";

  let newAddresses = {};

  if (fs.existsSync(jsonPath) && append) {
    const existingAddresses = JSON.parse(String(fs.readFileSync(jsonPath)));
    newAddresses = { ...existingAddresses, ...addresses };
  } else {
    newAddresses = { ...addresses };
  }

  fs.writeFileSync(jsonPath, JSON.stringify(newAddresses));
};

export const saveAddresses = (addresses: Record<string, string | object>, append = false) => {
  _saveAddresses(addresses, false, append);
};

export const readAddresses = (useAutoSavePath: boolean): Record<string, any> => {
  const specialFolder = process.env.SPECIAL_FOLDER;
  const specialName = process.env.SPECIAL_NAME;
  let dir = `./${configs.addressesLocation}/${network.name}/`;
  if (useAutoSavePath) {
    dir = `./${configs.addressesLocation}/autosave/${network.name}/`;
  }
  let jsonPath = dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (specialFolder) {
    const folderPath = `${dir}${specialFolder}/`;
    jsonPath = folderPath;
  }
  if (specialName) {
    jsonPath += `${specialName}`;
  }
  jsonPath += "Addresses.json";

  if (!fs.existsSync(jsonPath)) {
    throw new Error("Wrong path");
  }

  return JSON.parse(String(fs.readFileSync(jsonPath)));
};

export const advanceTime = async (seconds: number) => {
  await network.provider.send("evm_increaseTime", [seconds]);
  await network.provider.send("evm_mine");
};

export const advanceBlock = async (blockCount: number) => {
  for (let i = 0; i < blockCount; i++) {
    await network.provider.send("evm_mine");
  }
};

export const advanceBlockAndTime = async (blockCount: number, seconds: number) => {
  const secondPerBlock = Math.floor(seconds / blockCount);
  for (let i = 0; i < blockCount; i++) {
    await advanceTime(secondPerBlock);
  }
};

export const setTimestamp = async (seconds: number) => {
  await network.provider.send("evm_setNextBlockTimestamp", [seconds]);
  await network.provider.send("evm_mine");
};

export const getTimestamp = async (): Promise<number> => {
  const blockNumber = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNumber);
  return block.timestamp;
};

export const daysToSeconds = (days: BigNumber): BigNumber => {
  return hoursToSeconds(days.mul(24));
};

export const hoursToSeconds = (hours: BigNumber): BigNumber => {
  return minutesToSeconds(hours.mul(60));
};

export const minutesToSeconds = (minutes: BigNumber): BigNumber => {
  return minutes.mul(60);
};

export const getNextTimestampDivisibleBy = async (num: number): Promise<BigNumber> => {
  const blockTimestamp = await getTimestamp();
  const numCount = BigNumber.from(blockTimestamp).div(num);
  return numCount.add(1).mul(num);
};

export default {
  sleep,
  verifyContract,
  impersonateAccount,
  saveAddresses,
  readAddresses,
  advanceTime,
  advanceBlock,
  advanceBlockAndTime,
  setTimestamp,
  getTimestamp,
  daysToSeconds,
  hoursToSeconds,
  minutesToSeconds,
  getNextTimestampDivisibleBy,
};
