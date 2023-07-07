import hre, { ethers } from 'hardhat';
import { getDeploymentAddress } from '../../.deployment/deploymentManager';
import uploadToIPFS from '../../utils/uploadToIpfs';

async function main() {
  const network = hre.network.name;
  console.log('Network:', network);

  const [, alice] = await ethers.getSigners();

  // Get contract
  const promptHunt = await ethers.getContractAt(
    'PromptHunt',
    getDeploymentAddress(network, 'PromptHunt'),
  );

  // Upload to IPFS
  const data = {
    title: 'Title',
    model: 'GPT',
    prompt:
      'act as a nutritionist. create personalized a meal planner for a person of gender <gender> and age <age>',
    exampleInput: {
      gender: 'male',
      age: '30',
    },
    exampleOutput:
      'Day 1: Breakfast: Avocado and Bacon Omelette Recipe: Avocado and Bacon Omelette, Lunch: Greek Salad with Grilled Chicken Recipe: Greek Salad with Grilled Chicken, Dinner: Baked Salmon with Lemon Butter Sauce and Roasted Asparagus Recipe: Baked Salmon with Lemon Butter Sauce + Roasted Asparagus',
  };
  const dataUri = await uploadToIPFS(data);
  if (!dataUri) throw new Error('Failed to upload to IPFS');

  console.log('Data Uri: ', dataUri);

  // Set data
  const tx = await promptHunt.connect(alice).createPrompt(dataUri);
  await tx.wait();

  console.log('Created new prompt');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
