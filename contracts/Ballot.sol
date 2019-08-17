pragma solidity >=0.4.22 <0.6.0;

/// @title Voting with delegation.
contract Ballot {
    // This declares a new complex type which will
    // be used for variables later.
    // It will represent a single voter.
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address voterid; // person delegated to
        uint vote;   // index of the voted Candidate
    }

    // This is a type for a single Candidate.
    struct Candidate {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
        bytes32 party;
    }

    address public admin;
// mapping voterID to voter
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Candidate` structs.
    Candidate[] public candidates;

    /// Create a new ballot to choose one of `CandidateNames`.
    constructor(bytes32[] memory candidateNames,bytes32[] memory partyName) public {
        admin = msg.sender;
        voters[admin].weight = 1;

        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0,
                party: partyName[i]
            }));
        }
    }

//Pass in voter ID
    function giveRightToVote(address voter) public {
 
        require(
            msg.sender == admin,
            "Only admin can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }
    
      function validCandidate(uint candidate) view public returns (bool) {
    
	    if(candidate<candidates.length)
	    {
	    	return true;
	    }
	    return false;
	}
	
//cast your vote for candidate with id 'candidate'
    function vote(uint candidate) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = candidate;
        // If `Candidate` is out of the range of the array,this will throw automatically and revert all changes.
        candidates[candidate].voteCount += sender.weight;
    }

    function winningCandidate() public view
            returns (uint winningCandidate_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winningCandidate_ = p;
        }
       }
    }

    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = candidates[winningCandidate()].name;
    }
    function winningParty() public view
            returns (bytes32 winParty_)
    {
        winParty_ = candidates[winningCandidate()].party;
    }
    function totalVotesFor(uint voter) public view returns(uint) {
   	 return  candidates[voter].voteCount;
  }
}
