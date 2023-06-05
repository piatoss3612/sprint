var SimpleToken = artifacts.require("SimpleToken");

module.exports = (deployer) => {
  deployer.deploy(SimpleToken, "SimpleToken", "SPT");
};
