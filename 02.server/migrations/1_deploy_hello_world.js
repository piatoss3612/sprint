var helloWorld = artifacts.require("HelloWorld");

module.exports = (deployer) => {
  deployer.deploy(helloWorld);
};
