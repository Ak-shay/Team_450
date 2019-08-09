pragma solidity >=0.4.17;


    // @title Voting with delegation.
contract Election {
    /* This declares a new complex type which will be used for variables later.It will represent a single voter.*/
    uint electionStartTime;
    uint electionEndTime;

    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted Candidates
        bool AadharCard;//has presented Aadhar Card
        bool VoterID; // has presented voter ID card
    }

    mapping(uint => address) Candidates;
    mapping (string => uint) votes;
    /* This declares a state variable that
     stores a `Voter` struct for each possible address.*/
    mapping (address => Voter) public voters;
    mapping(address=>bool) hasVoted;


    // This is a type for a single Candidates.
    struct Candidates {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
        string[] criminalrecord;//stores a list of criminal records
        bool AadharCard;
        bool VoterID;
        uint netWorth;
    }

    address public admin;


    // A dynamically-sized array of `Candidates` structs.
    Candidates[] public candidates;

    // Create a new ballot to choose one of `CandidatesNames`.
    constructor(bytes32[] CandidatesNames) public {
        admin = msg.sender;
        voters[admin].weight = 1;

        /*
        For each of the provided Candidates names,
        create a new Candidates object and add it to the end of the array.
        */
        for (uint i = 0; i < CandidatesNames.length; i++) {
            /* `Candidates({...})` creates a temporary Candidates object and `candidates.push(...)`
             appends it to the end of `candidates`.*/
            candidates.push(Candidates({
                name: CandidatesNames[i],
                voteCount: 0
            }));
        }
    }

    /* Give `voter` the right to vote on this ballot.
     May only be called by `admin`.*/
    function giveRightToVote(address voter) public {
        /* If the first argument of `require` evaluates
        to `false`, execution terminates and all
        changes to the state and to Ether balances are reverted.
        This used to consume all gas in old EVM versions, but not anymore. It is often a good idea to use `require` to check if functions are called correctly.
        As a second argument, you can also provide an explanation about what went wrong.*/
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

    /// Delegate your vote to the voter `to`.
    function delegate(address to) public {
        // assigns reference
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");

        require(to != msg.sender, "Self-delegation is disallowed.");

        /* Forward the delegation as long as
         `to` also delegated.In general, such loops are very dangerous,
         because if they run too long, they might
         need more gas than is available in a block.
         In this case, the delegation will not be executed,
         but in other situations, such loops might cause a contract to get "stuck" completely.*/
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender, "Found loop in delegation.");
        }

        // Since `sender` is a reference, this modifies `voters[msg.sender].voted`
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            // If the delegate already voted, directly add to the number of votes
            candidates[delegate_.vote].voteCount += sender.weight;
        } 
        else 
        {
            // If the delegate did not vote yet, add to her weight.
            delegate_.weight += sender.weight;
        }
    }

    /* Give your vote (including votes delegated to you)
     to Candidates `candidates[Candidates].name`.*/
    function vote(uint Candidates) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = Candidates;

        /* If `Candidates` is out of the range of the array,
         this will throw automatically and revert all
        changes.
        */
        candidates[Candidates].voteCount += sender.weight;
    }

    /// @dev Computes the winning Candidates taking all
    /// previous votes into account.
    function winner() public view
            returns (uint winningCandidates_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winningCandidates_ = p;
            }
        }
    }

    /* Calls winningCandidates() function to get the index
     of the winner contained in the candidates array and then
     returns the name of the winner*/
    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = candidates[winningCandidates()].name;
    }
}