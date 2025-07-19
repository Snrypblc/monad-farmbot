// const { ethers } = require("ethers");

// // === RPC MONAD TESTNET ===
// const RPC_URL = "https://monad-testnet.rpc.thirdweb.com";
// const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// // === KONTRAK TOKEN ===
// const TOKEN_ADDRESS = "0x4aa50e8208095d9594d18e8e3008abb811125dce"; // ← Ganti dengan token buatanmu



// const ERC20_ABI = [
//   "function balanceOf(address) view returns (uint256)",
//   "function transfer(address,uint256) returns (bool)",
//   "function decimals() view returns (uint8)",
// ];

// // === WALLET PRIVATE KEYS ===
// const PRIVATE_KEYS = [
// "0xd53ccc2fb96a1260ed3a6711bd6254b6c1c51c243b43b6178a7aa03cf1a4651e",
// "0xaac1984a5ee425e2d016fb522819be019daf8c979a9534efacd7d4925edfaa32",
// "0x76717e6c82cfbdf3484f79a43c76614ae0a496460ce6e4cd637e063789cf6899",
// "0x4998101393d1e0bbf62bf9c014bf305c25373eacca28f846bee17ab7ed256b9c",
// ];

// const wallets = PRIVATE_KEYS.map(pk => new ethers.Wallet(pk, provider));
// const tokenContract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, provider);

// // === LOOP A → B → C → D → A ===
// const routes = [
//   { from: 0, to: 1, amount: "100" },
//   { from: 1, to: 2, amount: "100" },
//   { from: 2, to: 3, amount: "100" },
//   { from: 3, to: 0, amount: "100" },
// ];

// async function transferToken(fromIdx, toIdx, amountStr) {
//   const sender = wallets[fromIdx];
//   const receiver = wallets[toIdx].address;
//   const decimals = await tokenContract.decimals();
//   const amount = ethers.utils.parseUnits(amountStr, decimals);

//   const contractWithSigner = tokenContract.connect(sender);
//   const balance = await tokenContract.balanceOf(sender.address);

//   if (balance.lt(amount)) {
//     console.log(`❌ Wallet ${fromIdx} saldo token tidak cukup`);
//     return;
//   }

//   const tx = await contractWithSigner.transfer(receiver, amount);
//   console.log(`✅ Wallet ${fromIdx} → ${toIdx} | ${amountStr} JMBD`);
//   console.log(`🔗 Tx: ${tx.hash}`);
// }

// async function startLoop() {
//   for (let i = 0; i < routes.length; i++) {
//     const { from, to, amount } = routes[i];
//     await transferToken(from, to, amount);
//     await new Promise(res => setTimeout(res, 10_000)); // Delay antar transfer
//   }
//   console.log("🔁 Loop selesai, tunggu 30 detik...");
//   setTimeout(startLoop, 30_000);
// }

// startLoop();

// ini 2 token //

// const { ethers } = require("ethers");

// // === RPC MONAD TESTNET ===
// const RPC_URL = "https://monad-testnet.rpc.thirdweb.com";
// const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// // === KONTRAK TOKEN ===
// const TOKENS = [
//   {
//     name: "USDC",
//     address: "0x4aa50e8208095d9594d18e8e3008abb811125dce", // Token 1
//     amount: "100"
//   },
//   {
//     name: "MON",
//     address: "0xfe140e1dce99be9f4f15d657cd9b7bf622270c50", // Token 2
//     amount: "1"
//   }
// ];

// const ERC20_ABI = [
//   "function balanceOf(address) view returns (uint256)",
//   "function transfer(address,uint256) returns (bool)",
//   "function decimals() view returns (uint8)",
// ];

// // === WALLET PRIVATE KEYS ===
// const PRIVATE_KEYS = [
//   "0xd53ccc2fb96a1260ed3a6711bd6254b6c1c51c243b43b6178a7aa03cf1a4651e",
//   "0xaac1984a5ee425e2d016fb522819be019daf8c979a9534efacd7d4925edfaa32",
//   "0x76717e6c82cfbdf3484f79a43c76614ae0a496460ce6e4cd637e063789cf6899",
//   "0x4998101393d1e0bbf62bf9c014bf305c25373eacca28f846bee17ab7ed256b9c",
// ];

// const wallets = PRIVATE_KEYS.map(pk => new ethers.Wallet(pk, provider));

// // === LOOP A → B → C → D → A ===
// const routes = [
//   { from: 0, to: 1 },
//   { from: 1, to: 2 },
//   { from: 2, to: 3 },
//   { from: 3, to: 0 },
// ];

// async function transferToken(token, fromIdx, toIdx) {
//   const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
//   const sender = wallets[fromIdx];
//   const receiver = wallets[toIdx].address;

//   const decimals = await contract.decimals();
//   const amount = ethers.utils.parseUnits(token.amount, decimals);
//   const balance = await contract.balanceOf(sender.address);

//   if (balance.lt(amount)) {
//     console.log(`❌ [${token.name}] Wallet ${fromIdx} saldo tidak cukup`);
//     return;
//   }

//   const tx = await contract.connect(sender).transfer(receiver, amount);
//   console.log(`✅ [${token.name}] Wallet ${fromIdx} → ${toIdx} | ${token.amount} ${token.name}`);
//   console.log(`🔗 Tx: ${tx.hash}`);
// }

// async function startLoop() {
//   for (let route of routes) {
//     for (let token of TOKENS) {
//       await transferToken(token, route.from, route.to);
//       await new Promise(res => setTimeout(res, 5_000)); // Delay per token
//     }
//     await new Promise(res => setTimeout(res, 10_000)); // Delay per wallet ke wallet
//   }

//   console.log("🔁 Loop selesai, tunggu 30 detik...");
//   setTimeout(startLoop, 30_000);
// }

// startLoop();

//2 token random
const { ethers } = require("ethers");

// === RPC MONAD TESTNET ===
const RPC_URL = "https://monad-testnet.rpc.thirdweb.com";
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// === KONTRAK TOKEN ===
const TOKENS = [
  {
    name: "MOON",
    address: "0x4aa50e8208095d9594d18e8e3008abb811125dce",
    baseAmount: 100
  },
  {
    name: "YAKI",
    address: "0xfe140e1dce99be9f4f15d657cd9b7bf622270c50",
    baseAmount: 1
  }
];

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)",
  "function decimals() view returns (uint8)",
];

// === WALLET PRIVATE KEYS ===
const PRIVATE_KEYS = [
  "0xd53ccc2fb96a1260ed3a6711bd6254b6c1c51c243b43b6178a7aa03cf1a4651e",
  "0xaac1984a5ee425e2d016fb522819be019daf8c979a9534efacd7d4925edfaa32",
  "0x76717e6c82cfbdf3484f79a43c76614ae0a496460ce6e4cd637e063789cf6899",
  "0x4998101393d1e0bbf62bf9c014bf305c25373eacca28f846bee17ab7ed256b9c",
];

const wallets = PRIVATE_KEYS.map(pk => new ethers.Wallet(pk, provider));

// === LOOP ROUTES ===
const routes = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 0 },
];

function getRandomAmount(base, variance = 0.15) {
  const factor = 1 + (Math.random() * variance * 2 - variance);
  return (base * factor).toFixed(4);
}

function getRandomDelay(min = 5000, max = 12000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function transferToken(token, fromIdx, toIdx) {
  try {
    const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
    const sender = wallets[fromIdx];
    const receiver = wallets[toIdx].address;

    const decimals = await contract.decimals();
    const dynamicAmount = getRandomAmount(token.baseAmount);
    const amount = ethers.utils.parseUnits(dynamicAmount.toString(), decimals);
    const balance = await contract.balanceOf(sender.address);

    if (balance.lt(amount)) {
      console.log(`❌ [${token.name}] Wallet ${fromIdx} saldo tidak cukup`);
      return;
    }

    const tx = await contract.connect(sender).transfer(receiver, amount);
    console.log(`✅ [${token.name}] Wallet ${fromIdx} → ${toIdx} | ${dynamicAmount} ${token.name}`);
    console.log(`🔗 Tx: ${tx.hash}`);
  } catch (err) {
    console.error(`🚫 [${token.name}] Transfer gagal dari ${fromIdx} ke ${toIdx}:`, err.message || err);
  }
}

async function startLoop() {
  for (let route of routes) {
    for (let token of TOKENS) {
      await transferToken(token, route.from, route.to);
      await new Promise(res => setTimeout(res, getRandomDelay(4000, 8000)));
    }
    await new Promise(res => setTimeout(res, getRandomDelay(8000, 15000)));
  }

  console.log("🔁 Loop selesai, tunggu sebelum lanjut...");
  setTimeout(startLoop, getRandomDelay(30000, 60000));
}

startLoop();

