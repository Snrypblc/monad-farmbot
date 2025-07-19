const { ethers } = require("ethers");

// === KONFIGURASI ===
const RPC_URL = "https://monad-testnet.rpc.thirdweb.com";
const PRIVATE_KEY = "0x4d1d2a403a274d5c50b63992fffc63e82453a6fce69087b0bc8906a03e54357d";
const DESTINATION = "0x2E18d2ec0dA9A564410EAb066a5e3223D8632a17";
const MIN_REMAINING = ethers.utils.parseEther("0.001"); // Sisakan 0.001 MVM

// === PROVIDER & WALLET ===
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// === FUNGSI TRANSFER OTOMATIS ===
async function autoWithdraw() {
  try {
    const balance = await wallet.getBalance();
    console.log(`[${new Date().toLocaleTimeString()}] 💰 Saldo: ${ethers.utils.formatEther(balance)} MVM`);

    if (balance.gt(MIN_REMAINING)) {
      const gasLimit = ethers.BigNumber.from("21000");
      const gasPrice = await provider.getGasPrice();
      const fee = gasLimit.mul(gasPrice);
      const amount = balance.sub(MIN_REMAINING).sub(fee);

      if (amount.lte(0)) {
        console.log("⚠️ Tidak cukup saldo setelah fee dikurangi.");
        return;
      }

      const tx = await wallet.sendTransaction({
        to: DESTINATION,
        value: amount,
        gasLimit: gasLimit,
        gasPrice: gasPrice
      });

      console.log(`✅ Berhasil kirim ${ethers.utils.formatEther(amount)} MVM`);
      console.log(`🔗 Tx Hash: ${tx.hash}`);
    } else {
      console.log("⚠️ Saldo belum cukup untuk kirim.");
    }
  } catch (err) {
    console.error("❌ Gagal kirim:", err?.error?.message || err?.reason || err.message || err);
  }
}

setInterval(autoWithdraw, 10_000); // Setiap 10 detik
