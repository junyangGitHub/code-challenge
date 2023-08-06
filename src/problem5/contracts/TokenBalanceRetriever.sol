//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 
{
    function balanceOf(address account) external view returns (uint256);
}

contract TokenBalanceRetriever {
    struct TokenBalance {
        address token;
        uint256 balance;
    }

    function getBalances(address wallet, address[] calldata tokenAddresses) external view returns (TokenBalance[] memory) {
        TokenBalance[] memory balances = new TokenBalance[](tokenAddresses.length);
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            balances[i].token = tokenAddresses[i];
            ERC20 tokenContract = ERC20(tokenAddresses[i]);
            balances[i].balance = tokenContract.balanceOf(wallet);
        }
        return balances;
    }
}