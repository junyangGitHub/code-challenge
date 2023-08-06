import { ethers } from "ethers";

const SWTHToken: string = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468";
const lookups: string[] = [
    "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
    "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
    "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392"
]
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");
const SWTHAbi = [
    "function balanceOf(address) view returns (uint256)",
];
const SWTHContract = new ethers.Contract(SWTHToken, SWTHAbi, provider); 
const getBalances = async () => {
    const balances: { [address: string]: ethers.BigNumberish } = {}
    for (let i = 0; i < lookups.length; i++) {
        const balance = await SWTHContract.balanceOf(lookups[i]);
        balances[lookups[i]] = balance;
    }
    return balances;
}

getBalances().then((balances) => {
    for (const lookup of lookups) {
        console.log(`${lookup} ${ethers.formatUnits(balances[lookup], 8)}`);
    }
})