#!make
include .env

# -------------- DEPLOYMENT -------------- #

deploy: 
	npx hardhat deploy --network $(NETWORK)

deploy-verify: 
	npx hardhat deploy --verify --network $(NETWORK)

deploy-gnosis: 
	npx hardhat deploy --verify --network gnosis

deploy-chiado: 
	npx hardhat deploy --verify --network chiado

deploy-scroll: 
	npx hardhat deploy --verify --network scrollAlpha

#-------------- PLAYGROUND ----------------#

create-prompt:
	npx hardhat run scripts/playground/0-createPrompt.ts --network $(NETWORK)

upvote-prompt:
	npx hardhat run scripts/playground/1-upvotePrompt.ts --network $(NETWORK)

add-prompt-example:
	npx hardhat run scripts/playground/2-addPromptExample.ts --network $(NETWORK)

#-------------- SETUP ----------------#

setup: deploy create-prompt upvote-prompt add-prompt-example

#-------------- SUBGRAPH ----------------#

update-subgraph-config: update-subgraph-abis update-subgraph-addresses

ifeq ($(OS),Windows_NT)
update-subgraph-abis:
	Get-ChildItem -Path 'artifacts\contracts\' -Recurse -Include *.json | Where-Object { $_.FullName -notmatch '\\interfaces\\' -and $_.Name -notmatch '.*\.dbg\.json' } | Copy-Item -Destination '$(SUBGRAPH_FOLDER)\abis\' -Force
else
update-subgraph-abis:
	find artifacts/contracts -path "artifacts/contracts/interfaces" -prune -o -name "*.json" ! -name "*.dbg.json" -exec cp {} $(SUBGRAPH_FOLDER)/abis/ \;
endif

update-subgraph-addresses: 
	npx hardhat run scripts/utils/setSubgraphAddresses.ts --network $(NETWORK)