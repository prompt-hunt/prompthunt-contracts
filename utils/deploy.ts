import { ethers } from 'hardhat';
import { PromptHunt } from '../typechain-types';

export async function deploy(): Promise<[PromptHunt]> {
  const PromptHunt = await ethers.getContractFactory('PromptHunt');
  const promptHunt = await PromptHunt.deploy();
  await promptHunt.deployed();

  return [promptHunt];
}
