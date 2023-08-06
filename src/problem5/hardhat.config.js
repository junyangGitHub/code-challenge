require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const infuraProjectId = "05e8373ff74f46e5972a1d27c6de2a1a";

module.exports = {
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectId}`,
      accounts: [process.env.PRIVATE_KEY], // Add your private key or mnemonic here if deploying from an account
    },
    // Add other networks if needed
  },
  solidity: "0.8.0",
};