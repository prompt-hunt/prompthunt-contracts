// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract PromptHunt {
    using Counters for Counters.Counter;

    struct Prompt {
        address owner;
        string dataUri;
        uint256 upvotes;
    }

    // Prompts (id to prompt)
    mapping(uint256 => Prompt) public prompts;

    // Whether an address has upvoted a prompt (address -> prompt id -> bool)
    mapping(address => mapping(uint256 => bool)) public hasUpvotedPrompt;

    // Prompt id to owner
    mapping(uint256 => address) promptIdToOwner;

    // Total upvotes by user
    mapping(address => uint256) userUpvotes;

    // Total number of votes
    uint256 totalVotes;

    // Proposal request id counter
    Counters.Counter nextPromptId;

    // =========================== Events ==============================

    /**
     * @dev Emitted when a prompt is created
     */
    event PromptCreated(uint256 indexed id, address owner, string dataUri);

    /**
     * @dev Emitted when a prompt is upvoted
     */
    event PromptUpvoted(uint256 indexed id, address indexed upvoter);

    /**
     * @dev Emitted when a prompt example is added
     */
    event PromptExampleAdded(uint256 indexed id, address user, string dataUri);

    /**
     * @dev Emitted when a user's prompt is updated
     */
    event UserUpvotesUpdated(address indexed user, uint256 totalUpvotes);

    // =========================== Constructor ==============================

    constructor() {
        nextPromptId.increment();
    }

    // =========================== User functions ==============================

    /**
     * @dev Create a new prompt
     * @param _dataUri The data URI of the prompt
     */
    function createPrompt(string memory _dataUri) public {
        uint256 id = nextPromptId.current();
        prompts[id] = Prompt({owner: msg.sender, dataUri: _dataUri, upvotes: 0});
        nextPromptId.increment();

        promptIdToOwner[id] = msg.sender;

        emit PromptCreated(id, msg.sender, _dataUri);
    }

    /**
     * @dev Upvotes a prompt
     * @param _promptId The prompt id
     */
    function upvotePrompt(uint256 _promptId) public {
        require(_promptId < nextPromptId.current(), "Prompt does not exist");
        require(prompts[_promptId].owner != msg.sender, "Cannot upvote own prompt");
        require(!hasUpvotedPrompt[msg.sender][_promptId], "Already upvoted");
        Prompt storage prompt = prompts[_promptId];

        prompt.upvotes += 1;
        hasUpvotedPrompt[msg.sender][_promptId] = true;

        address owner = promptIdToOwner[_promptId];
        userUpvotes[owner] += 1;
        totalVotes += 1;

        emit PromptUpvoted(_promptId, msg.sender);
        emit UserUpvotesUpdated(owner, userUpvotes[owner]);
    }

    /**
     * @dev Adds an example to a prompt
     */
    function addPromptExample(uint256 _promptId, string memory _dataUri) public {
        require(_promptId < nextPromptId.current(), "Prompt does not exist");

        emit PromptExampleAdded(_promptId, msg.sender, _dataUri);
    }

    receive() external payable {}
}
