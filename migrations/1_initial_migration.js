const Migrations = artifacts.require("Migrations");
const Election = artifacts.require('Election');

module.exports = function(deployer) {
  deployer.deploy(Election, 'john', 'nick');
  deployer.deploy(Migrations);
};
