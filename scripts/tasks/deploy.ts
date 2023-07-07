import { setDeploymentAddress } from "../../.deployment/deploymentManager";
import { task } from "hardhat/config";
import { verifyAddress } from "../../utils/verifyAddress";

task("deploy", "Deploy all contracts")
  .addFlag("verify", "verify contracts on etherscan")
  .setAction(async (args, { ethers, network }) => {
    const { verify } = args;
    console.log("Network:", network.name);

    const [deployer] = await ethers.getSigners();
    console.log("Using address: ", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Balance: ", ethers.utils.formatEther(balance));

    const Storage = await ethers.getContractFactory("Storage");
    const storageArgs: [string] = ["Initial message"];
    const storage = await Storage.deploy(...storageArgs);

    await storage.deployed();

    if (verify) {
      await verifyAddress(storage.address, storageArgs);
    }

    console.log("Deployed Storage at", storage.address);
    setDeploymentAddress(network.name, "Storage", storage.address);
  });
