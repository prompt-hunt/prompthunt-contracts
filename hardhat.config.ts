import { HardhatUserConfig } from 'hardhat/config';
import 'hardhat-contract-sizer';
import '@nomicfoundation/hardhat-toolbox';

import './scripts/tasks/deploy';

import dotenv from 'dotenv';

dotenv.config();

const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error('Please set your MNEMONIC in a .env file');
}

const accounts = {
  mnemonic,
  count: 100,
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      accounts,
    },
    mumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts,
    },
    gnosis: {
      url: 'https://rpc.gnosischain.com',
      accounts,
    },
    chiado: {
      url: 'https://rpc.chiadochain.net',
      gasPrice: 1000000000,
      accounts,
    },
    scrollAlpha: {
      url: 'https://alpha-rpc.scroll.io/l2',
      accounts,
    },
  },
  etherscan: {
    customChains: [
      {
        network: 'chiado',
        chainId: 10200,
        urls: {
          //Blockscout
          apiURL: 'https://blockscout.com/gnosis/chiado/api',
          browserURL: 'https://blockscout.com/gnosis/chiado',
        },
      },
      {
        network: 'gnosis',
        chainId: 100,
        urls: {
          // 3) Select to what explorer verify the contracts
          // Gnosisscan
          apiURL: 'https://api.gnosisscan.io/api',
          browserURL: 'https://gnosisscan.io/',
          // Blockscout
          //apiURL: "https://blockscout.com/xdai/mainnet/api",
          //browserURL: "https://blockscout.com/xdai/mainnet",
        },
      },
      {
        network: 'scrollAlpha',
        chainId: 534353,
        urls: {
          apiURL: 'https://blockscout.scroll.io/api',
          browserURL: 'https://blockscout.scroll.io/',
        },
      },
    ],
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || '',
      //4) Insert your Gnosisscan API key
      //blockscout explorer verification does not require keys
      chiado: process.env.GNOSISSCAN_API_KEY || '',
      gnosis: process.env.GNOSISSCAN_API_KEY || '',
      scrollAlpha: 'abc',
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    only: ['PromptHunt'],
  },
};

export default config;
