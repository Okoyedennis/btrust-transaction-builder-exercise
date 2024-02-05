const bitcoin = require("bitcoinjs-lib");

// 1. Generate the redeem script
const lockHex = "427472757374204275696c64657273"; // 'Btrust Builders' in hex
const redeemScriptHex = `OP_SHA256 ${lockHex} OP_EQUAL`;

// 2. Derive an address from the redeem script
const redeemScript = bitcoin.script.fromASM(redeemScriptHex);
const scriptPubKey = bitcoin.payments.p2sh({
  redeem: { output: redeemScript },
});
const address = scriptPubKey.address;

console.log("Redeem Script:", redeemScriptHex);
console.log("Derived Address:", address);
