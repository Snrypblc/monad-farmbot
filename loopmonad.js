const { ethers } = require("ethers");

// === KONFIGURASI ===
const RPC_URL = "https://monad-testnet.rpc.thirdweb.com";
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const MIN_REMAINING = ethers.utils.parseEther("0.001"); // Sisakan 0.001 MVM

// === PRIVATE KEY 4 WALLET ===
// Ganti dengan private key asli (format hex string tanpa 0x jika dari Metamask export)
const PRIVATE_KEYS = [
  "0xd53ccc2fb96a1260ed3a6711bd6254b6c1c51c243b43b6178a7aa03cf1a4651e",
  "0xaac1984a5ee425e2d016fb522819be019daf8c979a9534efacd7d4925edfaa32",
  "0x76717e6c82cfbdf3484f79a43c76614ae0a496460ce6e4cd637e063789cf6899",
  "0x4998101393d1e0bbf62bf9c014bf305c25373eacca28f846bee17ab7ed256b9c",
];

// === SIAPKAN WALLET DAN LOOP ===
const wallets = PRIVATE_KEYS.map(pk => new ethers.Wallet(pk, provider));

// === SETUP LOOP (A → B → C → D → A) ===
const routes = [
  { from: 0, to: 1, amount: "0.1" },
  { from: 1, to: 2, amount: "0.1" },
  { from: 2, to: 3, amount: "0.1" },
  { from: 3, to: 0, amount: "0.1" },
];

// === FUNSI KIRIM ===
async function transfer(fromIdx, toIdx, amountInEth) {
  const sender = wallets[fromIdx];
  const receiver = wallets[toIdx].address;
  const amount = ethers.utils.parseEther(amountInEth);

  const balance = await sender.getBalance();
  const gasPrice = await provider.getGasPrice();
  const gasLimit = ethers.BigNumber.from("21000");
  const fee = gasPrice.mul(gasLimit);

  if (balance.lt(amount.add(fee))) {
    console.log(`❌ Wallet ${fromIdx} saldo tidak cukup (${ethers.utils.formatEther(balance)} MVM)`);
    return;
  }

  const tx = await sender.sendTransaction({
    to: receiver,
    value: amount,
    gasLimit,
    gasPrice,
  });

  console.log(`✅ Wallet ${fromIdx} → ${toIdx} | ${amountInEth} MVM`);
  console.log(`🔗 Tx: ${tx.hash}`);
}

// === JALANKAN SEMUA LOOP SECARA BERURUT ===
async function startLoop() {
  for (let i = 0; i < routes.length; i++) {
    const { from, to, amount } = routes[i];
    await transfer(from, to, amount);
    await new Promise(resolve => setTimeout(resolve, 20000)); // Delay 10 detik antar tx
  }
  console.log("🔁 Loop selesai, menunggu 10 detik untuk ulang...");
  setTimeout(startLoop, 6000000);
}

startLoop();
