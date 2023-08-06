const hre = require("hardhat");


async function main() {
  const BalanceReader = await hre.ethers.getContractFactory("TokenBalanceRetriever");
  const balanceReader = await BalanceReader.deploy();

  console.log("Contract deployed to:", balanceReader.address);
  console.log("Contract ABI:", JSON.stringify(balanceReader.abi, null, 2));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
