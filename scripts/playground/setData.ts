import hre, { ethers } from "hardhat";
import { getDeploymentAddress } from "../../.deployment/deploymentManager";
import uploadToIPFS from "../../utils/uploadToIpfs";

async function main() {
  const network = hre.network.name;
  console.log("Network:", network);

  const [, alice] = await ethers.getSigners();

  // Get contract
  const storage = await ethers.getContractAt(
    "Storage",
    getDeploymentAddress(network, "Storage")
  );

  // Upload to IPFS
  const data = {
    title: "Title",
  };
  const dataUri = await uploadToIPFS(data);
  if (!dataUri) throw new Error("Failed to upload to IPFS");

  console.log("Data Uri: ", dataUri);

  // Set data
  const tx = await storage.connect(alice).setData(dataUri);
  await tx.wait();

  console.log("Set new data");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
