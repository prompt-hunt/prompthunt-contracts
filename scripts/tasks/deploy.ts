import { setDeploymentAddress } from '../../.deployment/deploymentManager';
import { task } from 'hardhat/config';
import { verifyAddress } from '../../utils/verifyAddress';

task('deploy', 'Deploy all contracts')
  .addFlag('verify', 'verify contracts on etherscan')
  .setAction(async (args, { ethers, network }) => {
    const { verify } = args;
    console.log('Network:', network.name);

    const [deployer] = await ethers.getSigners();
    console.log('Using address: ', deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log('Balance: ', ethers.utils.formatEther(balance));

    const PromptHunt = await ethers.getContractFactory('PromptHunt');
    const promptHunt = await PromptHunt.deploy();

    await promptHunt.deployed();

    if (verify) {
      await verifyAddress(promptHunt.address, []);
    }

    console.log('Deployed PromptHunt at', promptHunt.address);
    setDeploymentAddress(network.name, 'PromptHunt', promptHunt.address);
  });
