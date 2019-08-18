var Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
 deployer.deploy(Voting, 20000, web3.utils.toWei('0.01', 'ether'), ['Rama', 'Nick', 'Jose'].map(name => web3.utils.asciiToHex(name)));
};