// etherscan api documentation for sepolia: https://docs.etherscan.io/v/sepolia-etherscan/
const Web3 = require("web3");
const prompt = require("prompt-sync")();

const web3 = new Web3();

const apiKey = prompt("API Key를 입력하세요: ");
const address = prompt("지갑 주소를 입력하세요: ");
let startBlockNumber = parseInt(prompt("시작 블록 번호를 입력하세요: "));
let endBlockNumber = parseInt(prompt("끝 블록 번호를 입력하세요: "));

if (startBlockNumber > endBlockNumber) {
  const temp = startBlockNumber;
  startBlockNumber = endBlockNumber;
  endBlockNumber = temp;
}

const endpoint = `https://api-sepolia.etherscan.io/api
?module=account
&action=txlist
&address=${address}
&startblock=${startBlockNumber}
&endblock=${endBlockNumber}
&page=1
&offset=20
&sort=asc
&apikey=${apiKey}`;

// Get a list of 'Normal' Transactions By Address
const getTransactionsByAccount = async () => {
  const res = await fetch(endpoint);
  const json = await res.json();
  return json.result;
};

const main = async () => {
  const txs = await getTransactionsByAccount();
  for (let i = 0; i < txs.length; i++) {
    const { blockNumber, from, to, value } = txs[i];
    const inEther = await web3.utils.fromWei(value, "ether");
    console.log(`블록 번호: ${blockNumber}`);
    console.log(`보낸 사람: ${from}`);
    console.log(`받는 사람: ${to}`);
    console.log(`보낸 이더: ${inEther} ETH`);
    console.log("=".repeat(50));
  }
};

main();
