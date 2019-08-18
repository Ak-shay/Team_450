pragma solidity >=0.4.0 <0.6.0;

contract Voting {

 // We use the struct datatype to store the voter information.
 struct voter {
  address voterAddress; // The address of the voter
  uint votes;  // The total no. of votes this voter owns
  uint[] votesPerCandidate; // Array to keep track of votes per candidate.
   }

 /* mapping is equivalent to an associate array or hash
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer which used to store the vote count
  */

 mapping (address => voter) public voterInfo;

 /* Solidity doesn't let you return an array of strings yet. We will use an array of bytes32
  instead to store the list of candidates
  */

 mapping (bytes32 => uint) public votesReceived;

 bytes32[] public candidateList;

 uint public totalvotes; // Total no. of votes available for this election
 uint public balancevotes; // Total no. of votes still available for purchase
 uint public votePrice; // Price per vote

 /* When the contract is deployed on the blockchain, we will initialize
  the total number of votes for sale, cost per vote and all the candidates
  */
 constructor(uint votes, bytes32[] memory candidateNames) public {
  candidateList = candidateNames;
  totalvotes = votes;
  balancevotes = votes;
  votePrice = 1;
 }

  //1. Users should be able to purchase votes 
  //2. Users should be able to vote for candidates with votes
  //3. Anyone should be able to lookup voter info
    function register() payable public {
    uint votesToBuy = 1;
    require(votesToBuy <= balancevotes);
    voterInfo[msg.sender].voterAddress = msg.sender;
    voterInfo[msg.sender].votesBought += 1;
    balancevotes -= 1;
  }
   function indexOfCandidate(bytes32 candidate) view public returns(uint) {
    for(uint i=0; i<candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return i;
      }
    }
    return uint(-1);
  }
//not accessing contract variables
  function totalvotesUsed(uint[] memory _votesUsedPerCandidate) private pure returns (uint) {
    uint totalUsedvotes = 0;
    for(uint i=0; i<_votesUsedPerCandidate.length; i++) {
      totalUsedvotes += _votesUsedPerCandidate[i];
    }
    return totalUsedvotes;
  } 

   function voteForCandidate(bytes32 candidate, uint votes) public {
    // Check to make sure user has enough votes to vote
    // Increment vote count for candidate
    // Update the voter struct votesUsedPerCandidate for this voter 
     
    uint availablevotes = voterInfo[msg.sender].votesBought - totalvotesUsed(voterInfo[msg.sender].votesUsedPerCandidate);
   
    require(votes <= availablevotes, "You don't have enough votes");
    votesReceived[candidate] += votes;
     
    if(voterInfo[msg.sender].votesUsedPerCandidate.length == 0) {
      for(uint i=0; i<candidateList.length; i++) {
        voterInfo[msg.sender].votesUsedPerCandidate.push(0);
      }
    }
     
    uint index = indexOfCandidate(candidate);
    voterInfo[msg.sender].votesUsedPerCandidate[index] += votes;
     
  }
   
 
  function voterDetails(address user) view public returns (uint, uint[] memory) {
    return (voterInfo[user].votesBought, voterInfo[user].votesUsedPerCandidate);
  }
   
  function votesSold() public view returns (uint) {
    return totalvotes - balancevotes;
  }
   
  function allCandidates() public view returns (bytes32[] memory) {
    return candidateList;
  }
   
  function totalVotesFor(bytes32 candidate) public view returns (uint) {
    return votesReceived[candidate];
  }
  
}
