pragma solidity >=0.4.17;


contract Election {
    // Representation of a single voter.
    struct Voter {
        address VoterID; // person VoterID 
        uint vote;   // stores the index of the voted Candidate
        uint weight; //always fixed at 1(number of votes a person can give)
        bool voted;  // if true, that person already voted
    }

    // This is a type for a single Candidate.
    struct Candidate {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
        bytes32 party;
    }

    address public admin;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters; 
    //uint corresponding to VoterID. SInce it is unique and sensitive we store it in the blockchain 

    // A dynamically-sized array of `Candidate` structs.
    Candidate[] public Candidates;

    /*Create a new ballot to choose one of the `CandidateNames`.
     Pass a pair of lists consisting of party and the name of the candidates at positions i*/
    constructor(bytes32[] memory CandidateNames,bytes32[] memory party) public {
        admin = msg.sender;
        uint i;
        voters[admin].weight = 1;
        while(i < CandidateNames.length){
            Candidates.push(Candidate({
                name: CandidateNames[i],
                voteCount: 0,
                party:party[i],
            }));
             i++;
        }
    }

    // Give `voter` the right to vote on the Election.
    // May only be called by `admin`.
    function giveRightToVote(address voter) public {
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(
            msg.sender == admin,
            "Only admin can give right to vote."
        );

        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    /// Give your vote (including votes VoterIDd to you)
    /// to Candidate `Candidates[Candidate].name`.
    function vote(uint Candidate) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Does not have right to vote.");
        require(!sender.voted, "You have already voted.");
        sender.voted = true;
        sender.vote = Candidate;

        // If `Candidate` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        Candidates[Candidate].voteCount += sender.weight;//always 1
    }

//finds the winning candidate
    function winningCandidate() public view
            returns (uint winningCandidate_)
    {
        uint p = 0;
        uint winningVoteCount = 0;
        for (p = 0; p < Candidates.length; p++) {
            if (Candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = Candidates[p].voteCount;
                winningCandidate_ = p;
            }
            else{
                continue;
            }
        }
    }
    

    // returns the name of the winner
    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = Candidates[winningCandidate()].name;
    }
    //returns winner's party
    function winningParty() public view
            returns (bytes32 party_)
    {
        party_ = Candidates[winningCandidate()].party;
    }
}