const Web3 = require('web3');
const Ballot = require('../../build/contracts/Ballot.json');

let candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"};

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Ballot.networks[networkId];
      this.Ballot = new web3.eth.Contract(
        Ballot.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.loadCandidatesAndVotes();
    } catch (error) {
      console.error("Could not connect to contract or chain.")
    }
  },

    loadCandidatesAndVotes: async function() {
      // The line below loads the totalVotesFor method from the list of methods 
      // returned by this.ballot.methods
      const { totalVotesFor } = this.ballot.methods;
      let candidateNames = Object.keys(candidates);
      for (var i = 0; i < candidateNames.length; i++) {
      let name = candidateNames[i];
      var count = await totalVotesFor(this.web3.utils.asciiToHex(name)).call();
      $("#" + candidates[name]).html(count);
      }
    },

    voteForCandidate: async function() {
      let candidateName = $("#candidate").val();
      $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
      $("#candidate").val("");
    
      const { totalVotesFor, voteForCandidate } = this.ballot.methods;
      await voteForCandidate(this.web3.utils.asciiToHex(candidateName)).send({gas: 140000, from: this.account});
      let div_id = candidates[candidateName];
      var count = await totalVotesFor(this.web3.utils.asciiToHex(candidateName)).call();
      $("#" + div_id).html(count);
      $("#msg").html("");
     }



//   refreshBalance: async function() {
//     const { getBalance } = this.meta.methods;
//     const balance = await getBalance(this.account).call();

//     const balanceElement = document.getElementsByClassName("balance")[0];
//     balanceElement.innerHTML = balance;
//   },

//   sendCoin: async function() {
//     const amount = parseInt(document.getElementById("amount").value);
//     const receiver = document.getElementById("receiver").value;

//     this.setStatus("Initiating transaction... (please wait)");

//     const { sendCoin } = this.meta.methods;
//     await sendCoin(receiver, amount).send({ from: this.account });

//     this.setStatus("Transaction complete!");
//     this.refreshBalance();
//   },

//   setStatus: function(message) {
//     const status = document.getElementById("status");
//     status.innerHTML = message;
//   },
 };

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});