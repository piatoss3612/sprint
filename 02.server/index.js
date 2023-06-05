const express = require("express");
const Web3 = require("web3");
const Contract = require("web3-eth-contract");
const fs = require("fs");
const app = express();
const port = 3000;
const networkId = 1337;

const getWeb3 = () => {
  return new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
};

const getAccounts = async () => {
  try {
    const accounts = await getWeb3().eth.getAccounts();
    return accounts;
  } catch (e) {
    return e;
  }
};

const getGasPrice = async () => {
  try {
    const gasPrice = await getWeb3().eth.getGasPrice();
    return gasPrice;
  } catch (e) {
    return e;
  }
};

const getBlock = async () => {
  try {
    const block = await getWeb3().eth.getBlock("latest");
    return block;
  } catch (e) {
    return e;
  }
};

const getHelloWorldCompiled = () => {
  return JSON.parse(fs.readFileSync("./build/contracts/HelloWorld.json"));

  return [parsed.networks[networkId].address, parsed.abi];
};

const helloWorld = async () => {
  try {
    const compiled = getHelloWorldCompiled();
    const address = compiled.networks[networkId].address;
    const abi = compiled.abi;

    Contract.setProvider("http://127.0.0.1:8545");
    const contract = new Contract(abi, address);

    return await contract.methods.renderHelloWorld().call();
  } catch (e) {
    return e;
  }
};

const getSimpleTokenCompiled = () => {
  return JSON.parse(fs.readFileSync("./build/contracts/SimpleToken.json"));
};

const deploySimpleToken = async () => {
  try {
    const compiled = getSimpleTokenCompiled();
    const abi = compiled.abi;
    const bytecode = compiled.bytecode;

    Contract.setProvider("http://127.0.0.1:8545");
    const contract = new Contract(abi);

    const accounts = await getAccounts();

    return await contract
      .deploy({
        data: bytecode,
        arguments: ["SimpleToken", "SPT"],
      })
      .send({ from: accounts[0], gas: 1500000, gasPrice: "30000000000000" });
  } catch (e) {
    return e;
  }
};

const transferSimpleToken = async () => {
  try {
    const compiled = getSimpleTokenCompiled();
    const abi = compiled.abi;
    const address = compiled.networks[networkId].address;
    const accounts = await getAccounts();

    Contract.setProvider("http://127.0.0.1:8545");
    const contract = new Contract(abi, address);
    const value = Web3.utils.toWei("1", "ether");

    return await contract.methods
      .transfer(accounts[1], value)
      .call({ from: accounts[0] });
  } catch (e) {
    return e;
  }
};

app.get("/", async (req, res) => {
  const accounts = await getAccounts();
  res.send(accounts);
});

app.get("/gasprice", async (req, res) => {
  const gasPrice = await getGasPrice();
  res.send(gasPrice);
});

app.get("/block", async (req, res) => {
  const block = await getBlock();
  res.send(block);
});

app.get("/helloworld", async (req, res) => {
  const hw = await helloWorld();
  res.send(hw);
});

app.get("/deploy", async (req, res) => {
  const receipt = await deploySimpleToken();
  res.send(receipt);
});

app.get("/transfer", async (req, res) => {
  const result = await transferSimpleToken();
  res.send(result);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
