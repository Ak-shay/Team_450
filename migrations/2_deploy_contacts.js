const Election = artifacts.require('Election');

module.exports = function(deployer) {
  deployer.deploy(Election, ['john', 'nick'].map(name => web3.utils.asciiToHex(name)), ['bjp', 'cong'].map(name => web3.utils.asciiToHex(name))); // candidates name
};