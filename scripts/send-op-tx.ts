import { createWalletClient, createPublicClient, http, parseEther } from "viem";
import { hardhat } from "viem/chains";
import hre from "hardhat";

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http("http://127.0.0.1:8545"),
});

const walletClient = createWalletClient({
  chain: hardhat,
  transport: http("http://127.0.0.1:8545"),
});

async function main() {
  const accounts = await walletClient.getAddresses();
  const buyer = accounts[0];
  const seller = accounts[1];

  console.log("Buyer:", buyer);
  console.log("Seller:", seller);

  const artifact = await hre.artifacts.readArtifact("Escrow");
  const abi = artifact.abi;

  // Deposit
  console.log("\n--- Depositing 1 ETH ---");
  const depositHash = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "deposit",
    account: buyer,
    value: parseEther("1"),
  });
  await publicClient.waitForTransactionReceipt({ hash: depositHash });
  console.log("Deposit successful!");

  const balance = await publicClient.getBalance({ address: CONTRACT_ADDRESS });
  console.log("Contract Balance:", balance.toString(), "wei");

  // Approve
  console.log("\n--- Approving payment to seller ---");
  const approveHash = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "approve",
    account: buyer,
  });
  await publicClient.waitForTransactionReceipt({ hash: approveHash });
  console.log("Approved! Seller received payment.");

  const finalBalance = await publicClient.getBalance({ address: CONTRACT_ADDRESS });
  console.log("Contract Balance after approve:", finalBalance.toString(), "wei");
  console.log("\n✅ Escrow complete!");
}

main().catch(console.error);
