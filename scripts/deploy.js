import { createWalletClient, http } from "viem";
import { hardhat } from "viem/chains";
import hre from "hardhat";

async function main() {
  console.log("Deploy started...");

  const publicClient = await hre.network.provider;

  const escrow = await hre.artifacts.readArtifact("Escrow");

  const walletClient = createWalletClient({
    chain: hardhat,
    transport: http("http://127.0.0.1:8545"),
  });

  const [account] = await walletClient.getAddresses();

  const hash = await walletClient.deployContract({
    abi: escrow.abi,
    bytecode: escrow.bytecode,
    account,
    args: [account],
  });

  const publicClientViem = (await import("viem")).createPublicClient({
    chain: hardhat,
    transport: http("http://127.0.0.1:8545"),
  });

  const receipt = await publicClientViem.waitForTransactionReceipt({ hash });

  console.log("Deployed successfully!");
  console.log("Contract Address:", receipt.contractAddress);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});