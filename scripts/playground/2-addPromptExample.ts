import hre, { ethers } from 'hardhat';
import { getDeploymentAddress } from '../../.deployment/deploymentManager';
import uploadToIPFS from '../../utils/uploadToIpfs';

async function main() {
  const network = hre.network.name;
  console.log('Network:', network);

  const [, , , carol] = await ethers.getSigners();

  // Get contract
  const promptHunt = await ethers.getContractAt(
    'PromptHunt',
    getDeploymentAddress(network, 'PromptHunt'),
  );

  // Upload to IPFS
  const exampleData = {
    exampleInput: {
      gender: 'female',
      age: '23',
    },
    exampleOutput: 'Day 1: Breakfast: Eggs',
  };
  const dataUri = await uploadToIPFS(exampleData);
  if (!dataUri) throw new Error('Failed to upload to IPFS');

  console.log('Data Uri: ', dataUri);

  // Set data
  const promptId = 1;
  const tx = await promptHunt.connect(carol).addPromptExample(promptId, dataUri);
  await tx.wait();

  console.log('Added prompt example');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
