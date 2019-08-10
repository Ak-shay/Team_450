pragma solidity >=0.4.17;

contract Election
{
    struct Candidates{
        uint VoterID;
        string name;
        uint voteCount;
        bool accepted;
        bytes32 party;
    }

    mapping(uint=>Candidates) public candidates;
    uint public candidatesCount;//counter for number of Candidates
    function Election() public{
        addCandidate("candidate 1");
            addCandidate("candidate 2");
    }

    function addCandidate(string _name, uint _voterID) private
    {

        candidates[++candidatesCount] = Candidate(_voterID,_name,0);

    }
}