import hre, { ethers } from 'hardhat';
import { getDeploymentAddress } from '../../.deployment/deploymentManager';
import uploadToIPFS from '../../utils/uploadToIpfs';

async function main() {
  const network = hre.network.name;
  console.log('Network:', network);

  const [, , bob] = await ethers.getSigners();

  // Get contract
  const promptHunt = await ethers.getContractAt(
    'PromptHunt',
    getDeploymentAddress(network, 'PromptHunt'),
  );

  // Upvote prompt
  const promptId = 1;
  const tx = await promptHunt.connect(bob).upvotePrompt(promptId);
  await tx.wait();

  console.log('Upvoted prompt');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
