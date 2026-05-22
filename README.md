# 🔒 Escrow Smart Contract DApp

A decentralized Escrow application built on Ethereum blockchain using Hardhat and Solidity.

## 📌 What is Escrow?
An Escrow is a financial arrangement where a third party holds funds on behalf of two parties involved in a transaction. In this project, a **Smart Contract** acts as the escrow — holding ETH from the Buyer and releasing it to the Seller only when the Buyer approves.

---

## 🏗️ Project Structure
```
Escrow-project/
├── contracts/
│   └── Escrow.sol          # Main smart contract
├── scripts/
│   ├── deploy.js           # Deployment script
│   ├── send-op-tx.ts       # Deposit & Approve transaction script
│   └── frontend/
│       └── index.html      # Frontend DApp
├── test/                   # Test files
├── hardhat.config.js       # Hardhat configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

---

## ⚙️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Solidity ^0.8.28 | Smart Contract Language |
| Hardhat v3 | Ethereum Development Framework |
| Viem v2 | Ethereum Interaction Library |
| Node.js | JavaScript Runtime |
| HTML/CSS/JS | Frontend DApp |
| MetaMask | Web3 Wallet |
| ethers.js v6 | Blockchain Interaction |

---

## 📋 Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MetaMask](https://metamask.io/) browser extension
- [VS Code](https://code.visualstudio.com/)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension

---

## 🚀 Installation & Setup

### Step 1: Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/escrow-project.git
cd escrow-project
```

### Step 2: Install dependencies
```bash
npm install
```

---

## ▶️ Running the Project

### Step 1: Start local blockchain node
Open **Terminal 1** and run:
```bash
npx hardhat node
```
✅ You should see:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```
⚠️ **Keep this terminal running!**

---

### Step 2: Deploy the smart contract
Open **Terminal 2** and run:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
✅ Expected output:
```
Deploy started...
Deployed successfully!
Contract Address: 0x5fbdb2315678afecb367f032d93f642f64180aa3
```

---

### Step 3: Run deposit & approve transaction
In **Terminal 2** run:
```bash
npx hardhat run scripts/send-op-tx.ts --network localhost
```
✅ Expected output:
```
Buyer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Seller: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

--- Depositing 1 ETH ---
Deposit successful!
Contract Balance: 1000000000000000000 wei

--- Approving payment to seller ---
Approved! Seller received payment.
Contract Balance after approve: 0 wei

✅ Escrow complete!
```

---

### Step 4: Run the Frontend DApp
1. Open `scripts/frontend/index.html` in VS Code
2. Click **"Go Live"** at the bottom status bar
3. Open Chrome and go to:
```
http://127.0.0.1:5500/scripts/frontend/index.html
```

---

## 🦊 MetaMask Setup

### Add Hardhat Local Network:
| Field | Value |
|-------|-------|
| Network Name | Hardhat Local |
| RPC URL | http://127.0.0.1:8545 |
| Chain ID | 31337 |
| Currency Symbol | ETH |

### Import Test Account:
Use Account #0 private key from hardhat node output:
```
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
⚠️ **WARNING: Never use this key on mainnet — it is a public test key!**

---

## 📝 Smart Contract Details

**File:** `contracts/Escrow.sol`

| Function | Description |
|----------|-------------|
| `constructor(address _seller)` | Sets buyer (msg.sender) and seller |
| `deposit()` | Buyer deposits ETH into contract |
| `approve()` | Buyer approves and releases ETH to seller |

**State Variables:**
- `buyer` — Address of the buyer
- `seller` — Address of the seller
- `isApproved` — Boolean flag for approval status

---

## 🔄 How It Works

```
Buyer ──── deposit() ────► Smart Contract ──── approve() ────► Seller
           (1 ETH)            (holds ETH)                      (receives ETH)
```

1. Buyer deploys contract with seller's address
2. Buyer calls `deposit()` — sends 1 ETH to contract
3. Contract holds the ETH securely
4. Buyer calls `approve()` — ETH is released to seller
5. Transaction complete ✅

---

## 🎯 Conclusion

This project successfully demonstrates a **decentralized escrow system** on Ethereum blockchain. The smart contract eliminates the need for a trusted third party, providing a secure, transparent, and trustless way to handle financial transactions between two parties.

---

## 👨‍💻 Author

**Sahil Raghatate**

---

## 📄 License

MIT License