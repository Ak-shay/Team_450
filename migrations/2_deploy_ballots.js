const Ballot = artifacts.require('Ballot');

module.exports = function(deployer) {
  deployer.deploy(Ballot, ['john', 'nick'].map(name => web3.utils.asciiToHex(name)),['bjp', 'congress'].map(name => web3.utils.asciiToHex(name))); // candidates name
};
