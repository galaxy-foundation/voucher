require('dotenv').config();
const {ethers} = require("ethers");

const mainnetContracts = require("./contracts/contracts.json");
// const ICICBContracts = require("./contracts/icicb_contracts.json");

// const localRpc = "http://127.0.0.1:8545";
const fantomtestnetRpc = "https://rpc.testnet.fantom.network";
const mainnetRpc = "http://13.59.118.124/eth";
// const icicbRPC = "http://13.58.153.103/"

// const localProvider = new ethers.providers.JsonRpcProvider(localRpc);
const fanttomTesnetProvider = new ethers.providers.JsonRpcProvider(fantomtestnetRpc);
const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetRpc);
// const icicbProvider = new ethers.providers.JsonRpcProvider(icicbRPC);

/* --------- testnet ----------- */
const presaleContract = new ethers.Contract(mainnetContracts.presale.address,mainnetContracts.presale.abi,fanttomTesnetProvider);
// const presaleVoucherContract = new ethers.Contract(mainnetContracts.presaleVoucher.address,mainnetContracts.presaleVoucher.abi,fanttomTesnetProvider);
const usdtContract = new ethers.Contract(mainnetContracts.usdt.address,mainnetContracts.usdt.abi,fanttomTesnetProvider);

/* --------- mainnet ----------- */
// const presaleContract = new ethers.Contract(mainnetContracts.presale.address,mainnetContracts.presale.abi,mainetSigner);
// const usdtContract = new ethers.Contract(mainnetContracts.usdt.address,mainnetContracts.usdt.abi,mainetSigner);

// const voucherContract = new ethers.Contract(ICICBContracts.voucher.address,ICICBContracts.voucher.abi,icicbProvider);
// const storeContract = new ethers.Contract(ICICBContracts.store.address,ICICBContracts.store.abi,icicbProvider);

export {
    fanttomTesnetProvider, mainnetProvider,
    presaleContract, usdtContract
}