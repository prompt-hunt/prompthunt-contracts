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
  const promptData = {
    title: 'Personalized Meal Planner',
    model: 'GPT',
    prompt:
      'Act as a nutritionist. create personalized a meal planner for a person of gender <gender> and age <age>',
    image:
      'https://firebasestorage.googleapis.com/v0/b/promptbase.appspot.com/o/DALLE_IMAGES%2FCrpcqah7YdgU133cBw6H%2Fresized%2F1687293200789_800x800.webp?alt=media&token=c5f63804-7181-4039-bf15-1a24bf98afea',
    exampleInput: {
      gender: 'female',
      age: '23',
    },
    exampleOutput:
      'Day 1: Breakfast: Avocado and Bacon Omelette Recipe: Avocado and Bacon Omelette, Lunch: Greek Salad with Grilled Chicken Recipe: Greek Salad with Grilled Chicken, Dinner: Baked Salmon with Lemon Butter Sauce and Roasted Asparagus Recipe: Baked Salmon with Lemon Butter Sauce + Roasted Asparagus',
    category: 'Art & Illustration',
  };
  const dataUri = await uploadToIPFS(promptData);
  if (!dataUri) throw new Error('Failed to upload to IPFS');

  console.log('Data Uri: ', dataUri);

  // Set data
  const tx = await promptHunt.connect(alice).createPrompt(dataUri);
  const receipt = await tx.wait();

  const promptId = receipt.events?.find((e) => e.event === 'PromptCreated')?.args?.id;

  console.log('Created new prompt with id: ', promptId);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
