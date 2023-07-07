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
    }

    // Prompts (id to prompt)
    mapping(uint256 => Prompt) public prompts;

    // Proposal request id counter
    Counters.Counter nextPromptId;

    // =========================== Events ==============================

    event PromptCreated(uint256 id, address owner, string dataUri);

    // =========================== Constructor ==============================

    constructor() {}

    // =========================== User functions ==============================

    /**
     * @dev Create a new prompt
     * @param _dataUri The data URI of the prompt
     */
    function createPrompt(string memory _dataUri) public {
        uint256 id = nextPromptId.current();
        prompts[id] = Prompt({owner: msg.sender, dataUri: _dataUri});
        nextPromptId.increment();

        emit PromptCreated(id, msg.sender, _dataUri);
    }
}
