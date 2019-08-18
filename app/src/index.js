import Web3 from "web3";
import votingArtifact from "../../build/contracts/Voting.json";

let candidates = {}
let pricePerToken;
 
const App = {
 web3: null,
 account: null,
 voting: null,
 contractAddress: null,

 start: async function() {
  const { web3 } = this;

  try {
   // get contract instance
   const networkId = await web3.eth.net.getId();
   const deployedNetwork = votingArtifact.networks[networkId];
   this.contractAddress = deployedNetwork.address;
   this.voting = new web3.eth.Contract(
    votingArtifact.abi,
    deployedNetwork.address,
   );

   // get accounts
   const accounts = await web3.eth.getAccounts();
   this.account = accounts[0];

   this.populateCandidates();

  } catch (error) {
   console.log(error);
   console.error("Could not connect to contract or chain.");
  }
 },

 populateCandidates: async function() {
  await this.loadCandidates();
  this.setupCandidateRows();
 },

 loadCandidates: async function() {
  const { allCandidates } = this.voting.methods;
   
  let candidateArray = await allCandidates().call();
  for(let i=0; i < candidateArray.length; i++) {
   /* We store the candidate names as bytes32 on the blockchain. We use the
    * handy toUtf8 method to convert from bytes32 to string
    */
   candidates[this.web3.utils.hexToUtf8(candidateArray[i])] = "candidate-" + i;
  }
 },

 populateTokenData: async function() {
  const { web3 } = this;
  const { totalTokens, tokensSold, tokenPrice } = this.voting.methods;

  let value = await totalTokens().call();
  $("#tokens-total").html(value.toString());

  value = await tokensSold().call();
  $("#tokens-sold").html(value.toString());

  value = await tokenPrice().call();
  pricePerToken = web3.utils.fromWei(value.toString());
  $("#token-cost").html(pricePerToken + " Ether");

  web3.eth.getBalance(this.contractAddress, function(error, result) {
   $("#contract-balance").html(web3.utils.fromWei(result.toString()) + " Ether");
  });
 },
 voteForCandidate: async function() {
  const { web3 } = this;
  let candidateName = $("#candidate").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
  $("#candidate").val("");
  $("#vote-tokens").val("");

  const { totalVotesFor, voteForCandidate } = this.voting.methods;
   
  await voteForCandidate(web3.utils.asciiToHex(candidateName), voteTokens).send({gas: 140000, from: this.account});
  console.log(candidates);
  console.log(candidateName);
  let div_id = candidates[candidateName];
  console.log(div_id);
  var count = await totalVotesFor(web3.utils.asciiToHex(candidateName)).call();
  $("#" + div_id).html(count);
  $("#msg").html("");
 },
  buyTokens: async function() {
  let tokensToBuy = parseInt($("#buy").val());
  let price = tokensToBuy * parseInt(this.web3.utils.toWei(pricePerToken));
  const { buy } = this.voting.methods;
   
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");
  await buy().send({gas: 140000, value: price, from: this.account})
  $("#buy-msg").html("");
  let balance = await this.web3.eth.getBalance(this.contractAddress)
  $("#contract-balance").html(this.web3.utils.fromWei(balance.toString()) + " Ether");
  await this.populateTokenData();
 },

 setupCandidateRows: function() {
  Object.keys(candidates).forEach(function (candidate) { 
   $("#candidate-rows").append("<tr><td>" + candidate + "</td><td id='" + candidates[candidate] + "'></td></tr>");
  });
 },
  
};

window.App = App;

window.addEventListener("load", function() {
 if (window.ethereum) {
  // use MetaMask's provider
  App.web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // get permission to access accounts
 } else {
  console.warn(
   "No web3 detected.",
  );
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  App.web3 = new Web3(
   new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
  );
 }

 App.start();
});
