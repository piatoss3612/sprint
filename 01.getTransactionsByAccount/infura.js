const Web3 = require("web3");
const prompt = require("prompt-sync")();

const rpcURL = prompt("RPC URL을 입력하세요: ");
const address = prompt("지갑 주소를 입력하세요: ");
let startBlockNumber = parseInt(prompt("시작 블록 번호를 입력하세요: "));
let endBlockNumber = parseInt(prompt("끝 블록 번호를 입력하세요: "));

const web3 = new Web3(rpcURL);

const getTransactions = async (web3, address, blockNumber) => {
  const block = await web3.eth.getBlock(blockNumber);

  if (!block) return [];

  const txHashes = block.transactions;

  const txs = [];

  txHashes.forEach(async (txHash) => {
    const tx = await web3.eth.getTransaction(txHash);
    if (!tx) return;
    if (tx.from === address || tx.to === address) txs.push(tx);
  });

  return txs;
};

const getTransactionsByAccount = async (
  web3,
  address,
  startBlockNumber,
  endBlockNumber
) => {
  const res = [];
  for (let i = startBlockNumber; i <= endBlockNumber; i++) {
    const txs = await getTransactions(web3, address, i);
    res.push(...txs);
  }
  return res;
};

const main = async () => {
  const balance = await web3.eth.getBalance(address);

  console.log(`지갑 ${address}의 잔액은... ${balance}입니다.`);

  const inEther = await web3.utils.fromWei(balance, "ether");

  console.log(`이더 단위로는 ${inEther} ETH 입니다.`);

  const txs = await getTransactionsByAccount(
    web3,
    address,
    startBlockNumber,
    endBlockNumber
  );

  console.log(
    `${startBlockNumber} ~ ${endBlockNumber} 블록에서 발생한 ${address}의 트랜잭션은...`
  );
  console.log(...txs);
};

main();
