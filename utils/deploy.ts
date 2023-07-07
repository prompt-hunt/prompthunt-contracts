import { ethers } from "hardhat";
import { Storage } from "../typechain-types";

export async function deploy(): Promise<[Storage]> {
  const Storage = await ethers.getContractFactory("Storage");
  const storage = await Storage.deploy("");
  await storage.deployed();

  return [storage];
}
