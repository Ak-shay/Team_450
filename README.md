# Code.Fun.DO 2019
## Team Members 
* Indraneel Ghosh - [ighosh98](https://github.com/ighosh98)
* Akshay Mittal - [Ak-shay](https://github.com/Ak-shay)
* Saransh Jindal - [UnlaxedNeurotic](https://github.com/UnlaxedNeurotic)

# Proof of Concept
## Problem Statement
Demonstrate how Azure Blockchain can be used to make Elections, referendum, and polls more secure, reliable, and transparent.<br />
Given: Indian Election Datasets
## Typical Challenges in Indian Elections
- Tools for authentication: 
  - Aadhar Card:As it is provided to every citizen of the country, we do not allow other ID verification options like PAN card adn driving license etc.
  - Voter ID Card(Provided to every citizen of India who has the right ot vote in a particular region)
  - Biometric Authentication
- Internet Access in all areas: Internet acces may or may not be available in a given location. If net access is not available,
send a one time use key(Unique hash key corresponding to the Voter ID of the individual [Hash Key would be different from Voter ID] ) for the person after user authentication is completed.
- Take proper survey of deceased and people who no longer vote in a gven region or have voter I cards made for multiple region and handle these cases.
- Send a notification to the candidate when his vote is being cast. (Reducing the chance of a fraudulent casting of vote)
- Ensure that one person can cast his vote only once.
- If foul play is suspected at any particular EVM, provide Admin the right to block the EVM.
- If a user is living in a different location, enable him to register his vote suing a suitable blockchain pipeline.
- Automatic application for Voter ID card given user details from Aadhar Card.(Once a person turns 18)
## Players in the Model
1. Administrator: One who monitors the election process.We can have multiple such trusted parties. The administrators specify the election type and create aforementioned election,configurate ballots, register voters, decide the lifetime of the election and assign permissioned nodes.
2. Voter: One who casts the vote.
3. Election Candidate: One who is standing for elections and is an option for the voter to vote for.
## Implementation Details
#### We would use a standard block chain design like Etherium for building this system. All contracts would be written in Solidity.
1. Add all the players(Administrator, Voter and Election Candidate) 
2. Admin accepts the applications for election Candidates and adds them to a "smart contract" on Azure Blockchain.
3. The candidates uploads the necessary details like manifesto, criminal records, personal vaulation details and any other necessary information.
4. If a person turns 18 and is eligible for voting, he gets registered automatically.
5. Voters can submit their Aadhar Card and Voter ID Card as proof of Authentification. The administrator would then verify those details by cross referencing with the details available with him. If authentication is successful Voters are given a unique hash key which allows them to vote. 
6. Using the unique key the voter casts his vote, the details of which are then fed into the blockchain.
this mechanism ensures that all the data remains protected. Process ends when lifetime of the election is complete.

# Tech Stack Details
1. Microsoft Azure Blockchain<br />
2. Solidity Programing Language(For Formulating Contract) <br />
3. Python <br />
4. Django Web Framework(For User Interface) with SQLlite/MySQL database<br />
5. Visual Studio Code <br />
6. Github(Version Control) <br />
7. Microsoft Azure Webservices <br />
## References
1. [Research Paper](https://skemman.is/bitstream/1946/31161/1/Research-Paper-BBEVS.pdf)
