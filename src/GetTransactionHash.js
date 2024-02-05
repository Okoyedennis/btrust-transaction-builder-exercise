const bitcoin = require("bitcoinjs-lib");

const getTransactionHash = (btcPrivateKey, btcAddress) => {
  // Define your private key and address
  const privateKey = btcPrivateKey; // Replace with your private key
  const address = btcAddress; // Replace with your Bitcoin address

  // Create a Bitcoin network (mainnet in this example)
  const network = bitcoin.networks.bitcoin;

  // Create a new transaction builder
  const txb = new bitcoin.TransactionBuilder(network);

  // Add an output to send some coins to a specific address
  txb.addOutput("bcrt1qu7rncpvqkz86dr9l4fwqescaxwlpnkawqxtvgs", 100000); // Replace with the recipient address

  // Fetch the UTXOs (unspent transaction outputs) associated with your address
  // You need to fetch the UTXOs from a Bitcoin node or an API like Blockchair
  // For simplicity, we'll use an empty array here
  const utxos = []; // Replace with your UTXOs

  // Add the UTXOs to the transaction builder
  for (const utxo of utxos) {
    txb.addInput(utxo.txid, utxo.vout);
  }

  // Sign the inputs with your private key
  for (let i = 0; i < utxos.length; i++) {
    txb.sign(i, bitcoin.ECPair.fromWIF(privateKey, network));
  }

  // Build the transaction
  const tx = txb.build();

  // Get the transaction hash
  const transactionHash = tx.getId();

  return transactionHash;
};

module.exports = {
  getTransactionHash,
};

// console.log("Transaction Hash:", transactionHash);
