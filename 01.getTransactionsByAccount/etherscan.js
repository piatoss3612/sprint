// etherscan api documentation for sepolia: https://docs.etherscan.io/v/sepolia-etherscan/
const prompt = require("prompt-sync")();

const apiKey = prompt("API Key를 입력하세요: ");
const address = prompt("지갑 주소를 입력하세요: ");
let startBlockNumber = parseInt(prompt("시작 블록 번호를 입력하세요: "));
let endBlockNumber = parseInt(prompt("끝 블록 번호를 입력하세요: "));

const endpoint = `https://api-sepolia.etherscan.io/api
?module=account
&action=txlist
&address=${address}
&startblock=${startBlockNumber}
&endblock=${endBlockNumber}
&page=1
&offset=10
&sort=asc
&apikey=${apiKey}`;

const getTransactionsByAccount = async () => {
  const res = await fetch(endpoint);
  const json = await res.json();
  return json.result;
};

const main = async () => {
  const txs = await getTransactionsByAccount();
  console.log(...txs);
};

main();
